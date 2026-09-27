import type { GridPosition } from "@/types/game";

export const VILLAGE_WIDTH = 10;
export const VILLAGE_HEIGHT = 8;

const BORDER_ROW = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const INTERIOR_ROW = [1, 0, 0, 0, 0, 0, 0, 0, 0, 1];

export const villageTiles: number[][] = [
  BORDER_ROW,
  INTERIOR_ROW,
  INTERIOR_ROW,
  INTERIOR_ROW,
  INTERIOR_ROW,
  INTERIOR_ROW,
  INTERIOR_ROW,
  BORDER_ROW,
];

export const hideoutPosition: GridPosition = { x: 1, y: 1 };
export const playerStartPosition: GridPosition = { x: 1, y: 2 };

export type VillageEncounter = {
  enemyId: string;
  position: GridPosition;
};

export const villageEncounters: VillageEncounter[] = [
  { enemyId: "slime", position: { x: 3, y: 2 } },
  { enemyId: "bat", position: { x: 5, y: 3 } },
  { enemyId: "goblin", position: { x: 7, y: 2 } },
  { enemyId: "crow", position: { x: 3, y: 5 } },
  { enemyId: "wolf", position: { x: 6, y: 6 } },
  { enemyId: "dragon", position: { x: 8, y: 6 } },
];
