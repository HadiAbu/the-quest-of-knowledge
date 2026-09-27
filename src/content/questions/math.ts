import type { Question } from "@/types/game";

export const mathQuestions: Question[] = [
  {
    id: "math-1",
    subject: "math",
    grade: 1,
    type: "multiple-choice",
    prompt: { en: "What is 2 + 3?", he: "כמה זה 2 ועוד 3?", ar: "كم يساوي 2 + 3؟" },
    options: [
      { en: "4", he: "4", ar: "4" },
      { en: "5", he: "5", ar: "5" },
      { en: "6", he: "6", ar: "6" },
      { en: "7", he: "7", ar: "7" },
    ],
    answerIndex: 1,
  },
  {
    id: "math-2",
    subject: "math",
    grade: 4,
    type: "true-false",
    prompt: { en: "Is 7 × 6 = 42?", he: "האם 7 × 6 = 42?", ar: "هل 7 × 6 = 42؟" },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 0,
  },
];
