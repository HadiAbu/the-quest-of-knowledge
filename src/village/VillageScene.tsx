import { useEffect } from "react";
import { useGameStore } from "@lib/persistence/store";
import type { Direction } from "./villageReducer";
import {
  villageTiles,
  hideoutPosition,
  villageEncounters,
} from "@content/village-map";
import type { GridPosition } from "@/types/game";

const TILE_SIZE = 48;

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  W: "up",
  s: "down",
  S: "down",
  a: "left",
  A: "left",
  d: "right",
  D: "right",
};

type VillageSceneProps = {
  position: GridPosition;
  onMove: (direction: Direction) => void;
  onEncounter: (enemyId: string) => void;
  onReachHideout: () => void;
};

export function VillageScene({ position, onMove, onEncounter, onReachHideout }: VillageSceneProps) {
  const defeatedEnemyIds = useGameStore((state) => state.defeatedEnemyIds);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const direction = KEY_DIRECTIONS[event.key];
      if (direction) {
        onMove(direction);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onMove]);

  useEffect(() => {
    if (position.x === hideoutPosition.x && position.y === hideoutPosition.y) {
      onReachHideout();
      return;
    }
    const encounter = villageEncounters.find(
      (candidate) =>
        candidate.position.x === position.x &&
        candidate.position.y === position.y &&
        !defeatedEnemyIds.includes(candidate.enemyId),
    );
    if (encounter) {
      onEncounter(encounter.enemyId);
    }
  }, [position, defeatedEnemyIds, onEncounter, onReachHideout]);

  const activeEncounterIds = new Set(
    villageEncounters
      .filter((encounter) => !defeatedEnemyIds.includes(encounter.enemyId))
      .map((encounter) => `${encounter.position.x}-${encounter.position.y}`),
  );

  return (
    <div
      className="relative bg-green-900"
      style={{
        width: villageTiles[0].length * TILE_SIZE,
        height: villageTiles.length * TILE_SIZE,
      }}
    >
      {villageTiles.map((row, y) =>
        row.map((tile, x) => (
          <div
            key={`${x}-${y}`}
            className={tile === 1 ? "absolute bg-stone-700" : "absolute bg-green-700"}
            style={{
              left: x * TILE_SIZE,
              top: y * TILE_SIZE,
              width: TILE_SIZE,
              height: TILE_SIZE,
            }}
          />
        )),
      )}
      {activeEncounterIds.size > 0 &&
        villageEncounters
          .filter((encounter) => activeEncounterIds.has(`${encounter.position.x}-${encounter.position.y}`))
          .map((encounter) => (
            <div
              key={encounter.enemyId}
              className="absolute flex items-center justify-center bg-red-700 text-xs text-white"
              style={{
                left: encounter.position.x * TILE_SIZE,
                top: encounter.position.y * TILE_SIZE,
                width: TILE_SIZE,
                height: TILE_SIZE,
              }}
            >
              {encounter.enemyId}
            </div>
          ))}
      <div
        className="absolute rounded-full bg-yellow-400"
        style={{
          left: position.x * TILE_SIZE,
          top: position.y * TILE_SIZE,
          width: TILE_SIZE,
          height: TILE_SIZE,
        }}
      />
    </div>
  );
}
