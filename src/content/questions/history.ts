import type { Question } from "@/types/game";

export const historyQuestions: Question[] = [
  {
    id: "history-1",
    subject: "history",
    grade: 3,
    type: "multiple-choice",
    prompt: {
      en: "Who was the first President of the United States?",
      he: "מי היה הנשיא הראשון של ארצות הברית?",
      ar: "من كان أول رئيس للولايات المتحدة؟",
    },
    options: [
      { en: "Abraham Lincoln", he: "אברהם לינקולן", ar: "أبراهام لينكولن" },
      { en: "George Washington", he: "ג'ורג' וושינגטון", ar: "جورج واشنطن" },
      { en: "Thomas Jefferson", he: "תומאס ג'פרסון", ar: "توماس جيفرسون" },
      { en: "John Adams", he: "ג'ון אדמס", ar: "جون آدامز" },
    ],
    answerIndex: 1,
  },
  {
    id: "history-2",
    subject: "history",
    grade: 5,
    type: "true-false",
    prompt: {
      en: "The pyramids of Giza are in Egypt.",
      he: "האם הפירמידות של גיזה נמצאות במצרים?",
      ar: "هل توجد أهرامات الجيزة في مصر؟",
    },
    options: [
      { en: "True", he: "נכון", ar: "صحيح" },
      { en: "False", he: "לא נכון", ar: "خطأ" },
    ],
    answerIndex: 0,
  },
];
