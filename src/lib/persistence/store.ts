import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Locale } from "@/types/game";

const DEFAULT_HP_MAX = 20;

export type BankedState = {
  name: string;
  characterId: string;
  locale: Locale;
  hpMax: number;
  bankedCurrency: number;
  bankedXp: number;
  ownedUpgradeIds: string[];
  equippedArmorId: string | null;
  hasSeenTutorial: boolean;
  defeatedEnemyIds: string[];
};

export type BankedActions = {
  setProfile: (name: string, characterId: string, locale: Locale) => void;
  markTutorialSeen: () => void;
  markEnemyDefeated: (enemyId: string) => void;
  bankRun: (gains: { currency: number; xp: number }) => void;
  purchaseUpgrade: (upgradeId: string, cost: number) => boolean;
  equipArmor: (upgradeId: string) => void;
};

export const useGameStore = create<BankedState & BankedActions>()(
  persist(
    (set, get) => ({
      name: "",
      characterId: "",
      locale: "en",
      hpMax: DEFAULT_HP_MAX,
      bankedCurrency: 0,
      bankedXp: 0,
      ownedUpgradeIds: [],
      equippedArmorId: null,
      hasSeenTutorial: false,
      defeatedEnemyIds: [],

      setProfile: (name, characterId, locale) => set({ name, characterId, locale }),

      markTutorialSeen: () => set({ hasSeenTutorial: true }),

      markEnemyDefeated: (enemyId) =>
        set((state) => ({
          defeatedEnemyIds: state.defeatedEnemyIds.includes(enemyId)
            ? state.defeatedEnemyIds
            : [...state.defeatedEnemyIds, enemyId],
        })),

      bankRun: (gains) =>
        set((state) => ({
          bankedCurrency: state.bankedCurrency + gains.currency,
          bankedXp: state.bankedXp + gains.xp,
        })),

      purchaseUpgrade: (upgradeId, cost) => {
        const state = get();
        if (state.ownedUpgradeIds.includes(upgradeId)) return false;
        if (state.bankedCurrency < cost) return false;
        set({
          bankedCurrency: state.bankedCurrency - cost,
          ownedUpgradeIds: [...state.ownedUpgradeIds, upgradeId],
        });
        return true;
      },

      equipArmor: (upgradeId) => set({ equippedArmorId: upgradeId }),
    }),
    { name: "kamal-save" },
  ),
);
