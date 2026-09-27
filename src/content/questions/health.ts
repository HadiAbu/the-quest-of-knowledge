import type { Question } from "@/types/game";

export const healthQuestions: Question[] = [
  {
    id: "health-1",
    subject: "health",
    grade: 1,
    type: "multiple-choice",
    prompt: {
      en: "How many times a day should you brush your teeth?",
      he: "כמה פעמים ביום כדאי לצחצח שיניים?",
      ar: "كم مرة في اليوم يجب أن تنظف أسنانك؟",
    },
    options: [
      { en: "Never", he: "אף פעם", ar: "أبدًا" },
      { en: "Once a week", he: "פעם בשבוע", ar: "مرة واحدة في الأسبوع" },
      { en: "At least twice a day", he: "לפחות פעמיים ביום", ar: "مرتين على الأقل يوميًا" },
      { en: "Only on birthdays", he: "רק ביום הולדת", ar: "فقط في عيد ميلادك" },
    ],
    answerIndex: 2,
  },
  {
    id: "health-2",
    subject: "health",
    grade: 3,
    type: "true-false",
    prompt: {
      en: "Washing your hands helps stop germs from spreading.",
      he: "האם שטיפת ידיים עוזרת למנוע התפשטות חיידקים?",
      ar: "هل غسل اليدين يساعد على منع انتشار الجراثيم؟",
    },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 0,
  },
];
