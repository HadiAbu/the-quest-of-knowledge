import type { Question } from "@/types/game";

export const geographyQuestions: Question[] = [
  {
    id: "geography-1",
    subject: "geography",
    grade: 2,
    type: "multiple-choice",
    prompt: {
      en: "Which is the largest ocean on Earth?",
      he: "מהו האוקיינוס הגדול ביותר בעולם?",
      ar: "ما هو أكبر محيط في العالم؟",
    },
    options: [
      { en: "Atlantic", he: "האוקיינוס האטלנטי", ar: "المحيط الأطلسي" },
      { en: "Indian", he: "האוקיינוס ההודי", ar: "المحيط الهندي" },
      { en: "Pacific", he: "האוקיינוס השקט", ar: "المحيط الهادئ" },
      { en: "Arctic", he: "האוקיינוס הארקטי", ar: "المحيط المتجمد الشمالي" },
    ],
    answerIndex: 2,
  },
  {
    id: "geography-2",
    subject: "geography",
    grade: 5,
    type: "true-false",
    prompt: {
      en: "Mount Everest is the tallest mountain in the world.",
      he: "האם הר האוורסט הוא ההר הגבוה ביותר בעולם?",
      ar: "هل جبل إفرست هو أعلى جبل في العالم؟",
    },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 0,
  },
];
