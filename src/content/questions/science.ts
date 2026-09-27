import type { Question } from "@/types/game";

export const scienceQuestions: Question[] = [
  {
    id: "science-1",
    subject: "science",
    grade: 1,
    type: "multiple-choice",
    prompt: {
      en: "What do plants need to grow?",
      he: "מה צמחים צריכים כדי לגדול?",
      ar: "ماذا تحتاج النباتات لتنمو؟",
    },
    options: [
      { en: "Sunlight and water", he: "אור שמש ומים", ar: "ضوء الشمس والماء" },
      { en: "Only sand", he: "רק חול", ar: "الرمل فقط" },
      { en: "Only rocks", he: "רק אבנים", ar: "الصخور فقط" },
      { en: "Only wind", he: "רק רוח", ar: "الرياح فقط" },
    ],
    answerIndex: 0,
  },
  {
    id: "science-2",
    subject: "science",
    grade: 4,
    type: "true-false",
    prompt: {
      en: "The sun is a star.",
      he: "האם השמש היא כוכב?",
      ar: "هل الشمس هي نجم؟",
    },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 0,
  },
];
