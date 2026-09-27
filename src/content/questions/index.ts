import type { Question, Subject } from "@/types/game";
import { mathQuestions } from "./math";
import { historyQuestions } from "./history";
import { grammarQuestions } from "./grammar";
import { geographyQuestions } from "./geography";
import { scienceQuestions } from "./science";
import { healthQuestions } from "./health";
import { moralityQuestions } from "./morality";

export const QUESTIONS_BY_SUBJECT: Record<Subject, Question[]> = {
  math: mathQuestions,
  history: historyQuestions,
  grammar: grammarQuestions,
  geography: geographyQuestions,
  science: scienceQuestions,
  health: healthQuestions,
  morality: moralityQuestions,
};

export function pickRandomQuestion(subject: Subject): Question {
  const bank = QUESTIONS_BY_SUBJECT[subject];
  const index = Math.floor(Math.random() * bank.length);
  return bank[index];
}
