import type { Question } from "@/types/game";

export const grammarQuestions: Question[] = [
  {
    id: "grammar-1",
    subject: "grammar",
    grade: 2,
    type: "multiple-choice",
    prompt: {
      en: "Which word is a noun?",
      he: "איזו מהמילים היא בצורת רבים?",
      ar: "أي كلمة تبدأ بأداة التعريف 'ال'؟",
    },
    options: [
      { en: "run", he: "ילד", ar: "كتاب" },
      { en: "happy", he: "כלב", ar: "بيت" },
      { en: "dog", he: "ילדים", ar: "القمر" },
      { en: "quickly", he: "שולחן", ar: "شمس" },
    ],
    answerIndex: 2,
  },
  {
    id: "grammar-2",
    subject: "grammar",
    grade: 4,
    type: "true-false",
    prompt: {
      en: "The word 'quickly' is an adverb.",
      he: "האם המילה 'מהר' מתארת כיצד עושים פעולה?",
      ar: "هل كلمة 'بسرعة' تصف كيف يحدث الفعل؟",
    },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 0,
  },
];
