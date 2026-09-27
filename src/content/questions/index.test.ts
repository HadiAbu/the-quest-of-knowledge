import { describe, expect, it, vi } from "vitest";
import { pickRandomQuestion, QUESTIONS_BY_SUBJECT } from "./index";
import type { Subject } from "@/types/game";

const ALL_SUBJECTS: Subject[] = [
  "math",
  "history",
  "grammar",
  "geography",
  "science",
  "health",
  "morality",
];

describe("QUESTIONS_BY_SUBJECT", () => {
  it("has at least one question for every subject", () => {
    for (const subject of ALL_SUBJECTS) {
      expect(QUESTIONS_BY_SUBJECT[subject].length).toBeGreaterThan(0);
    }
  });

  it("gives every question full en/he/ar prompt and option text", () => {
    for (const subject of ALL_SUBJECTS) {
      for (const question of QUESTIONS_BY_SUBJECT[subject]) {
        expect(question.prompt.en).toBeTruthy();
        expect(question.prompt.he).toBeTruthy();
        expect(question.prompt.ar).toBeTruthy();
        for (const option of question.options) {
          expect(option.en).toBeTruthy();
          expect(option.he).toBeTruthy();
          expect(option.ar).toBeTruthy();
        }
        expect(question.answerIndex).toBeGreaterThanOrEqual(0);
        expect(question.answerIndex).toBeLessThan(question.options.length);
      }
    }
  });
});

describe("pickRandomQuestion", () => {
  it("returns a question belonging to the requested subject", () => {
    for (const subject of ALL_SUBJECTS) {
      const question = pickRandomQuestion(subject);
      expect(question.subject).toBe(subject);
    }
  });

  it("uses Math.random to select the index", () => {
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0);
    const question = pickRandomQuestion("math");
    expect(question.id).toBe(QUESTIONS_BY_SUBJECT.math[0].id);
    randomSpy.mockRestore();
  });
});
