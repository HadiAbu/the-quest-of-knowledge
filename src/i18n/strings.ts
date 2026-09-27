import type { Locale } from "@/types/game";

export type StringId =
  | "welcome.title"
  | "welcome.namePrompt"
  | "welcome.characterPrompt"
  | "welcome.languagePrompt"
  | "welcome.start"
  | "tutorial.step1"
  | "tutorial.step2"
  | "tutorial.step3"
  | "tutorial.step4"
  | "tutorial.next"
  | "tutorial.done"
  | "hud.hp"
  | "hud.currency"
  | "hud.xp"
  | "hideout.title"
  | "hideout.bankedMessage"
  | "hideout.shopTitle"
  | "hideout.buy"
  | "hideout.owned"
  | "hideout.notEnoughCurrency"
  | "hideout.continue"
  | "battle.victory"
  | "battle.defeat"
  | "battle.correct"
  | "battle.incorrect"
  | "battle.continue";

export const STRINGS: Record<StringId, Record<Locale, string>> = {
  "welcome.title": {
    en: "Welcome to Kamal!",
    he: "ברוכים הבאים לכמאל!",
    ar: "مرحبًا بك في كمال!",
  },
  "welcome.namePrompt": {
    en: "What's your name?",
    he: "מה השם שלך?",
    ar: "ما اسمك؟",
  },
  "welcome.characterPrompt": {
    en: "Choose your character",
    he: "בחר את הדמות שלך",
    ar: "اختر شخصيتك",
  },
  "welcome.languagePrompt": {
    en: "Choose your language",
    he: "בחר שפה",
    ar: "اختر اللغة",
  },
  "welcome.start": { en: "Start", he: "התחל", ar: "ابدأ" },
  "tutorial.step1": {
    en: "Use the arrow keys or WASD to walk around the village.",
    he: "השתמש בחצים או ב-WASD כדי ללכת בכפר.",
    ar: "استخدم مفاتيح الأسهم أو WASD للتنقل في القرية.",
  },
  "tutorial.step2": {
    en: "Walk into an enemy to start a quiz battle.",
    he: "התקרב לאויב כדי להתחיל קרב חידונים.",
    ar: "اقترب من عدو لبدء معركة أسئلة.",
  },
  "tutorial.step3": {
    en: "Answer correctly to earn currency and XP. Wrong answers hurt you!",
    he: "ענה נכון כדי להרוויח מטבעות ונקודות ניסיון. תשובה שגויה תפגע בך!",
    ar: "أجب بشكل صحيح لتكسب العملات ونقاط الخبرة. الإجابة الخاطئة تؤذيك!",
  },
  "tutorial.step4": {
    en: "Return to your hideout to save your progress and buy upgrades.",
    he: "חזור למחבוא שלך כדי לשמור את ההתקדמות ולקנות שדרוגים.",
    ar: "عد إلى مخبئك لحفظ تقدمك وشراء الترقيات.",
  },
  "tutorial.next": { en: "Next", he: "הבא", ar: "التالي" },
  "tutorial.done": { en: "Let's go!", he: "בואו נצא לדרך!", ar: "هيا بنا!" },
  "hud.hp": { en: "HP", he: "בריאות", ar: "الصحة" },
  "hud.currency": { en: "Coins", he: "מטבעות", ar: "عملات" },
  "hud.xp": { en: "XP", he: "נק' ניסיון", ar: "نقاط الخبرة" },
  "hideout.title": { en: "Hideout", he: "המחבוא", ar: "المخبأ" },
  "hideout.bankedMessage": {
    en: "Your progress has been saved!",
    he: "ההתקדמות שלך נשמרה!",
    ar: "تم حفظ تقدمك!",
  },
  "hideout.shopTitle": { en: "Upgrades", he: "שדרוגים", ar: "الترقيات" },
  "hideout.buy": { en: "Buy", he: "קנה", ar: "شراء" },
  "hideout.owned": { en: "Owned", he: "בבעלותך", ar: "مملوك" },
  "hideout.notEnoughCurrency": {
    en: "Not enough coins",
    he: "אין מספיק מטבעות",
    ar: "لا توجد عملات كافية",
  },
  "hideout.continue": {
    en: "Back to the village",
    he: "חזרה לכפר",
    ar: "العودة إلى القرية",
  },
  "battle.victory": { en: "You won!", he: "ניצחת!", ar: "لقد فزت!" },
  "battle.defeat": { en: "You were defeated...", he: "הובסת...", ar: "لقد هُزمت..." },
  "battle.correct": { en: "Correct!", he: "נכון!", ar: "إجابة صحيحة!" },
  "battle.incorrect": { en: "Not quite!", he: "לא בדיוק!", ar: "ليست صحيحة تمامًا!" },
  "battle.continue": { en: "Continue", he: "המשך", ar: "متابعة" },
};
