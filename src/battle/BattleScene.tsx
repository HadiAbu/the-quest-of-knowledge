import { useReducer } from "react";
import { useTranslation } from "@i18n/useTranslation";
import { useGameStore } from "@lib/persistence/store";
import { getEnemyById } from "@content/enemies";
import { pickRandomQuestion } from "@content/questions";
import { battleReducer, createInitialBattleState, DEFAULT_DAMAGE } from "./battleReducer";

type BattleSceneProps = {
  enemyId: string;
  startingPlayerHp: number;
  onVictory: (result: { currency: number; xp: number; remainingPlayerHp: number }) => void;
  onDefeat: () => void;
};

export function BattleScene({ enemyId, startingPlayerHp, onVictory, onDefeat }: BattleSceneProps) {
  const { t, locale } = useTranslation();
  const hpMax = useGameStore((state) => state.hpMax);
  const enemy = getEnemyById(enemyId);
  const [state, dispatch] = useReducer(battleReducer, undefined, () =>
    createInitialBattleState({
      enemyId,
      enemyMaxHp: enemy.maxHp,
      playerMaxHp: hpMax,
      playerHp: startingPlayerHp,
      firstQuestion: pickRandomQuestion(enemy.subject),
    }),
  );

  function handleAnswer(selectedIndex: number) {
    const correct = selectedIndex === state.currentQuestion.answerIndex;
    dispatch({ type: "ANSWER", correct, damage: DEFAULT_DAMAGE });
  }

  function handleContinue() {
    if (state.status === "won") {
      onVictory({
        currency: enemy.currencyReward,
        xp: enemy.xpReward,
        remainingPlayerHp: state.playerHp,
      });
      return;
    }
    if (state.status === "lost") {
      onDefeat();
      return;
    }
    dispatch({ type: "CONTINUE", nextQuestion: pickRandomQuestion(enemy.subject) });
  }

  const question = state.currentQuestion;
  const showingQuestion = state.status === "active" && state.lastAnswerCorrect === null;
  const showingFeedback = state.status === "active" && state.lastAnswerCorrect !== null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 p-6 text-white">
      <div className="flex w-full max-w-md items-center justify-between">
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl">🧑</span>
          <progress className="w-24" value={state.playerHp} max={state.playerMaxHp} />
          <span className="text-xs">
            {t("hud.hp")}: {state.playerHp}/{state.playerMaxHp}
          </span>
        </div>
        <span className="text-2xl">⚔️</span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl">👹</span>
          <progress className="w-24" value={state.enemyHp} max={state.enemyMaxHp} />
          <span className="text-xs">
            {enemy.name[locale]}: {state.enemyHp}/{state.enemyMaxHp}
          </span>
        </div>
      </div>

      {showingQuestion && (
        <div className="w-full max-w-md">
          <p className="mb-4 text-center text-lg">{question.prompt[locale]}</p>
          <div className="grid grid-cols-1 gap-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleAnswer(index)}
                className="rounded bg-slate-700 px-4 py-2 text-start hover:bg-slate-600"
              >
                {option[locale]}
              </button>
            ))}
          </div>
        </div>
      )}

      {showingFeedback && (
        <div className="text-center">
          <p className="mb-4 text-lg">
            {state.lastAnswerCorrect ? t("battle.correct") : t("battle.incorrect")}
          </p>
          <button type="button" onClick={handleContinue} className="rounded bg-blue-600 px-4 py-2">
            {t("battle.continue")}
          </button>
        </div>
      )}

      {state.status === "won" && (
        <div className="text-center">
          <p className="mb-4 text-lg">{t("battle.victory")}</p>
          <button type="button" onClick={handleContinue} className="rounded bg-green-600 px-4 py-2">
            {t("battle.continue")}
          </button>
        </div>
      )}

      {state.status === "lost" && (
        <div className="text-center">
          <p className="mb-4 text-lg">{t("battle.defeat")}</p>
          <button type="button" onClick={handleContinue} className="rounded bg-red-600 px-4 py-2">
            {t("battle.continue")}
          </button>
        </div>
      )}
    </div>
  );
}
