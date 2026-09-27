import { describe, expect, it } from "vitest";
import {
  battleReducer,
  createInitialBattleState,
  type BattleState,
} from "./battleReducer";
import type { Question } from "@/types/game";

const stubQuestion: Question = {
  id: "stub-1",
  subject: "math",
  grade: 1,
  type: "true-false",
  prompt: { en: "stub", he: "stub", ar: "stub" },
  options: [
    { en: "True", he: "נכון", ar: "صحيح" },
    { en: "False", he: "לא נכון", ar: "خطأ" },
  ],
  answerIndex: 0,
};

function makeState(overrides: Partial<BattleState> = {}): BattleState {
  return {
    ...createInitialBattleState({
      enemyId: "slime",
      enemyMaxHp: 20,
      playerMaxHp: 20,
      playerHp: 20,
      firstQuestion: stubQuestion,
    }),
    ...overrides,
  };
}

describe("createInitialBattleState", () => {
  it("starts the enemy at full HP with the given question and no result yet", () => {
    const state = makeState();
    expect(state.enemyHp).toBe(20);
    expect(state.currentQuestion).toBe(stubQuestion);
    expect(state.lastAnswerCorrect).toBeNull();
    expect(state.status).toBe("active");
  });

  it("starts the player at whatever HP the run carried in, not always max", () => {
    const state = createInitialBattleState({
      enemyId: "slime",
      enemyMaxHp: 20,
      playerMaxHp: 20,
      playerHp: 6,
      firstQuestion: stubQuestion,
    });
    expect(state.playerHp).toBe(6);
    expect(state.playerMaxHp).toBe(20);
  });
});

describe("battleReducer", () => {
  it("damages the enemy on a correct answer", () => {
    const state = makeState();
    const next = battleReducer(state, { type: "ANSWER", correct: true, damage: 10 });
    expect(next.enemyHp).toBe(10);
    expect(next.playerHp).toBe(20);
    expect(next.lastAnswerCorrect).toBe(true);
    expect(next.status).toBe("active");
  });

  it("damages the player on an incorrect answer", () => {
    const state = makeState();
    const next = battleReducer(state, { type: "ANSWER", correct: false, damage: 10 });
    expect(next.playerHp).toBe(10);
    expect(next.enemyHp).toBe(20);
    expect(next.lastAnswerCorrect).toBe(false);
    expect(next.status).toBe("active");
  });

  it("sets status to 'won' when enemy HP reaches 0", () => {
    const state = makeState({ enemyHp: 5 });
    const next = battleReducer(state, { type: "ANSWER", correct: true, damage: 10 });
    expect(next.enemyHp).toBe(0);
    expect(next.status).toBe("won");
  });

  it("sets status to 'lost' when player HP reaches 0", () => {
    const state = makeState({ playerHp: 5 });
    const next = battleReducer(state, { type: "ANSWER", correct: false, damage: 10 });
    expect(next.playerHp).toBe(0);
    expect(next.status).toBe("lost");
  });

  it("never drops HP below 0", () => {
    const state = makeState({ enemyHp: 5 });
    const next = battleReducer(state, { type: "ANSWER", correct: true, damage: 999 });
    expect(next.enemyHp).toBe(0);
  });

  it("ignores ANSWER actions once the battle is no longer active", () => {
    const wonState = makeState({ status: "won" });
    const next = battleReducer(wonState, { type: "ANSWER", correct: true, damage: 10 });
    expect(next).toBe(wonState);
  });

  it("CONTINUE swaps in the next question and clears the last result", () => {
    const state: BattleState = {
      ...makeState(),
      lastAnswerCorrect: true,
    };
    const nextQuestion: Question = { ...stubQuestion, id: "stub-2" };
    const next = battleReducer(state, { type: "CONTINUE", nextQuestion });
    expect(next.currentQuestion).toBe(nextQuestion);
    expect(next.lastAnswerCorrect).toBeNull();
  });

  it("ignores CONTINUE once the battle is no longer active", () => {
    const lostState = makeState({ status: "lost" });
    const next = battleReducer(lostState, { type: "CONTINUE", nextQuestion: stubQuestion });
    expect(next).toBe(lostState);
  });
});
