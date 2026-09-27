import type { Upgrade } from "@/types/game";

export const UPGRADES: Upgrade[] = [
  {
    id: "armor-leather",
    kind: "armor",
    label: { en: "Leather Helm", he: "כובע עור", ar: "خوذة جلدية" },
    cost: 20,
  },
  {
    id: "armor-iron",
    kind: "armor",
    label: { en: "Iron Helm", he: "כובע ברזל", ar: "خوذة حديدية" },
    cost: 50,
  },
  {
    id: "hideout-banner",
    kind: "hideout",
    label: { en: "Banner", he: "דגלון", ar: "راية" },
    cost: 15,
  },
  {
    id: "hideout-garden",
    kind: "hideout",
    label: { en: "Garden", he: "גינה", ar: "حديقة" },
    cost: 40,
  },
];
