import type { Question } from "@/types/game";

export const moralityQuestions: Question[] = [
  {
    id: "morality-1",
    subject: "morality",
    grade: 2,
    type: "multiple-choice",
    prompt: {
      en: "If you see a friend drop their books, what is the kind thing to do?",
      he: "אם אתה רואה חבר שהפיל את הספרים שלו, מה הדבר האדיב לעשות?",
      ar: "إذا رأيت صديقًا أسقط كتبه، ما هو التصرف اللطيف؟",
    },
    options: [
      { en: "Laugh at them", he: "לצחוק עליו", ar: "الضحك عليه" },
      { en: "Walk away", he: "ללכת משם", ar: "الابتعاد" },
      { en: "Help them pick the books up", he: "לעזור לו לאסוף את הספרים", ar: "مساعدته في التقاط الكتب" },
      { en: "Tell them to be careful", he: "להגיד לו להיזהר", ar: "إخباره بأن يكون حذرًا" },
    ],
    answerIndex: 2,
  },
  {
    id: "morality-2",
    subject: "morality",
    grade: 5,
    type: "true-false",
    prompt: {
      en: "It is okay to take something that is not yours without asking.",
      he: "האם מותר לקחת משהו שלא שייך לך בלי לשאול?",
      ar: "هل يجوز أخذ شيء لا يخصك دون أن تسأل؟",
    },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 1,
  },
];
