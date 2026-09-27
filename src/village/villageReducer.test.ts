import { describe, expect, it } from "vitest";
import { isWalkable, villageReducer, type VillageState } from "./villageReducer";
import { playerStartPosition } from "@content/village-map";

describe("isWalkable", () => {
  it("returns false for the border tiles", () => {
    expect(isWalkable(0, 0)).toBe(false);
    expect(isWalkable(9, 7)).toBe(false);
  });

  it("returns true for interior tiles", () => {
    expect(isWalkable(1, 1)).toBe(true);
    expect(isWalkable(5, 4)).toBe(true);
  });

  it("returns false outside the grid bounds", () => {
    expect(isWalkable(-1, 3)).toBe(false);
    expect(isWalkable(3, -1)).toBe(false);
    expect(isWalkable(100, 3)).toBe(false);
  });
});

describe("villageReducer", () => {
  const initialState: VillageState = { position: playerStartPosition };

  it("moves the player one tile in the given direction when walkable", () => {
    const next = villageReducer(initialState, { type: "MOVE", direction: "right" });
    expect(next.position).toEqual({ x: playerStartPosition.x + 1, y: playerStartPosition.y });
  });

  it("does not move the player into a blocked tile", () => {
    const atLeftEdge: VillageState = { position: { x: 1, y: 1 } };
    const next = villageReducer(atLeftEdge, { type: "MOVE", direction: "left" });
    expect(next.position).toEqual({ x: 1, y: 1 });
    expect(next).toBe(atLeftEdge);
  });

  it("does not move the player past the top border", () => {
    const atTopEdge: VillageState = { position: { x: 1, y: 1 } };
    const next = villageReducer(atTopEdge, { type: "MOVE", direction: "up" });
    expect(next.position).toEqual({ x: 1, y: 1 });
  });
});
