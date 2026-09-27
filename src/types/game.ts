export type Locale = "en" | "he" | "ar";

export type LocalizedText = Record<Locale, string>;

export type Subject =
  | "math"
  | "history"
  | "grammar"
  | "geography"
  | "science"
  | "health"
  | "morality";

export type Grade = 1 | 2 | 3 | 4 | 5 | 6;

export type QuestionType = "multiple-choice" | "true-false";

export type Question = {
  id: string;
  subject: Subject;
  grade: Grade;
  type: QuestionType;
  prompt: LocalizedText;
  options: LocalizedText[];
  answerIndex: number;
};

export type Character = {
  id: string;
  label: LocalizedText;
};

export type Upgrade = {
  id: string;
  kind: "armor" | "hideout";
  label: LocalizedText;
  cost: number;
};

export type Enemy = {
  id: string;
  name: LocalizedText;
  subject: Subject;
  maxHp: number;
  currencyReward: number;
  xpReward: number;
  isBoss: boolean;
};

export type GridPosition = { x: number; y: number };
