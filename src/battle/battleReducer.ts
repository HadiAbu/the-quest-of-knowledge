import type { Question } from "@/types/game";

export const DEFAULT_DAMAGE = 10;

export type BattleStatus = "active" | "won" | "lost";

export type BattleState = {
  enemyId: string;
  enemyMaxHp: number;
  enemyHp: number;
  playerMaxHp: number;
  playerHp: number;
  currentQuestion: Question;
  lastAnswerCorrect: boolean | null;
  status: BattleStatus;
};

export type BattleAction =
  | { type: "ANSWER"; correct: boolean; damage: number }
  | { type: "CONTINUE"; nextQuestion: Question };

export function createInitialBattleState(params: {
  enemyId: string;
  enemyMaxHp: number;
  playerMaxHp: number;
  playerHp: number;
  firstQuestion: Question;
}): BattleState {
  return {
    enemyId: params.enemyId,
    enemyMaxHp: params.enemyMaxHp,
    enemyHp: params.enemyMaxHp,
    playerMaxHp: params.playerMaxHp,
    playerHp: params.playerHp,
    currentQuestion: params.firstQuestion,
    lastAnswerCorrect: null,
    status: "active",
  };
}

export function battleReducer(state: BattleState, action: BattleAction): BattleState {
  if (state.status !== "active") return state;

  switch (action.type) {
    case "ANSWER": {
      if (action.correct) {
        const enemyHp = Math.max(0, state.enemyHp - action.damage);
        return {
          ...state,
          enemyHp,
          lastAnswerCorrect: true,
          status: enemyHp <= 0 ? "won" : state.status,
        };
      }
      const playerHp = Math.max(0, state.playerHp - action.damage);
      return {
        ...state,
        playerHp,
        lastAnswerCorrect: false,
        status: playerHp <= 0 ? "lost" : state.status,
      };
    }
    case "CONTINUE":
      return { ...state, currentQuestion: action.nextQuestion, lastAnswerCorrect: null };
  }
}
