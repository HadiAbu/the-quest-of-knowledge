import type { Enemy } from "@/types/game";

export const ENEMIES: Enemy[] = [
  {
    id: "slime",
    name: { en: "Slime", he: "רפש", ar: "الوحل" },
    subject: "math",
    maxHp: 20,
    currencyReward: 5,
    xpReward: 5,
    isBoss: false,
  },
  {
    id: "bat",
    name: { en: "Bat", he: "עטלף", ar: "الخفاش" },
    subject: "science",
    maxHp: 20,
    currencyReward: 5,
    xpReward: 5,
    isBoss: false,
  },
  {
    id: "goblin",
    name: { en: "Goblin", he: "גובלין", ar: "غوبلن" },
    subject: "geography",
    maxHp: 25,
    currencyReward: 7,
    xpReward: 7,
    isBoss: false,
  },
  {
    id: "crow",
    name: { en: "Crow", he: "עורב", ar: "الغراب" },
    subject: "grammar",
    maxHp: 20,
    currencyReward: 5,
    xpReward: 5,
    isBoss: false,
  },
  {
    id: "wolf",
    name: { en: "Wolf", he: "זאב", ar: "الذئب" },
    subject: "health",
    maxHp: 25,
    currencyReward: 7,
    xpReward: 7,
    isBoss: false,
  },
  {
    id: "dragon",
    name: { en: "Dragon", he: "דרקון", ar: "التنين" },
    subject: "history",
    maxHp: 50,
    currencyReward: 30,
    xpReward: 30,
    isBoss: true,
  },
];

export function getEnemyById(id: string): Enemy {
  const enemy = ENEMIES.find((candidate) => candidate.id === id);
  if (!enemy) {
    throw new Error(`Unknown enemy id: ${id}`);
  }
  return enemy;
}
