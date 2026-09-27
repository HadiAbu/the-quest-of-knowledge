import { useEffect, useState } from "react";
import { useGameStore } from "@lib/persistence/store";
import { directionForLocale } from "@i18n/locale";
import { villageReducer, type Direction } from "@village/villageReducer";
import { playerStartPosition } from "@content/village-map";
import { WelcomeScreen } from "@/welcome/WelcomeScreen";
import { TutorialOverlay } from "@/welcome/TutorialOverlay";
import { VillageScene } from "@village/VillageScene";
import { BattleScene } from "@battle/BattleScene";
import { HideoutScene } from "@hideout/HideoutScene";
import { Hud } from "@components/Hud";
import type { GridPosition } from "@/types/game";

type Scene = "welcome" | "tutorial" | "village" | "battle" | "hideout";

type RunState = {
  hp: number;
  currency: number;
  xp: number;
  position: GridPosition;
};

function freshRun(hpMax: number): RunState {
  return { hp: hpMax, currency: 0, xp: 0, position: playerStartPosition };
}

export default function App() {
  const name = useGameStore((state) => state.name);
  const hasSeenTutorial = useGameStore((state) => state.hasSeenTutorial);
  const hpMax = useGameStore((state) => state.hpMax);
  const locale = useGameStore((state) => state.locale);
  const bankRun = useGameStore((state) => state.bankRun);
  const markEnemyDefeated = useGameStore((state) => state.markEnemyDefeated);

  const [scene, setScene] = useState<Scene>(() => {
    if (!name) return "welcome";
    if (!hasSeenTutorial) return "tutorial";
    return "village";
  });
  const [run, setRun] = useState<RunState>(() => freshRun(hpMax));
  const [activeEnemyId, setActiveEnemyId] = useState<string | null>(null);
  const [justBanked, setJustBanked] = useState(false);

  useEffect(() => {
    document.documentElement.dir = directionForLocale(locale);
    document.documentElement.lang = locale;
  }, [locale]);

  function handleWelcomeComplete() {
    setScene("tutorial");
  }

  function handleTutorialComplete() {
    setRun(freshRun(hpMax));
    setScene("village");
  }

  function handleMove(direction: Direction) {
    setRun((current) => {
      const moved = villageReducer({ position: current.position }, { type: "MOVE", direction });
      return { ...current, position: moved.position };
    });
  }

  function handleEncounter(enemyId: string) {
    setActiveEnemyId(enemyId);
    setScene("battle");
  }

  function handleReachHideout() {
    bankRun({ currency: run.currency, xp: run.xp });
    setRun(freshRun(hpMax));
    setJustBanked(true);
    setScene("hideout");
  }

  function handleVictory(result: { currency: number; xp: number; remainingPlayerHp: number }) {
    if (activeEnemyId) {
      markEnemyDefeated(activeEnemyId);
    }
    setRun((current) => ({
      ...current,
      hp: result.remainingPlayerHp,
      currency: current.currency + result.currency,
      xp: current.xp + result.xp,
    }));
    setActiveEnemyId(null);
    setScene("village");
  }

  function handleDefeat() {
    setActiveEnemyId(null);
    setRun(freshRun(hpMax));
    setJustBanked(false);
    setScene("hideout");
  }

  function handleHideoutContinue() {
    setJustBanked(false);
    setRun(freshRun(hpMax));
    setScene("village");
  }

  if (scene === "welcome") {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  if (scene === "tutorial") {
    return <TutorialOverlay onComplete={handleTutorialComplete} />;
  }

  if (scene === "hideout") {
    return <HideoutScene justBanked={justBanked} onContinue={handleHideoutContinue} />;
  }

  if (scene === "battle" && activeEnemyId) {
    return (
      <BattleScene
        enemyId={activeEnemyId}
        startingPlayerHp={run.hp}
        onVictory={handleVictory}
        onDefeat={handleDefeat}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 p-6">
      <Hud hp={run.hp} currency={run.currency} xp={run.xp} />
      <VillageScene
        position={run.position}
        onMove={handleMove}
        onEncounter={handleEncounter}
        onReachHideout={handleReachHideout}
      />
    </div>
  );
}
