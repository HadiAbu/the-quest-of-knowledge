import type { GridPosition } from "@/types/game";
import { villageTiles } from "@content/village-map";

export type Direction = "up" | "down" | "left" | "right";

export type VillageState = { position: GridPosition };

export type VillageAction = { type: "MOVE"; direction: Direction };

const DELTAS: Record<Direction, GridPosition> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function isWalkable(x: number, y: number): boolean {
  const row = villageTiles[y];
  if (!row) return false;
  const tile = row[x];
  if (tile === undefined) return false;
  return tile === 0;
}

export function villageReducer(state: VillageState, action: VillageAction): VillageState {
  const delta = DELTAS[action.direction];
  const nextX = state.position.x + delta.x;
  const nextY = state.position.y + delta.y;
  if (!isWalkable(nextX, nextY)) return state;
  return { position: { x: nextX, y: nextY } };
}
