import { useTranslation } from "@i18n/useTranslation";
import { useGameStore } from "@lib/persistence/store";
import { UPGRADES } from "@content/upgrades";

type HideoutSceneProps = {
  justBanked: boolean;
  onContinue: () => void;
};

export function HideoutScene({ justBanked, onContinue }: HideoutSceneProps) {
  const { t, locale } = useTranslation();
  const bankedCurrency = useGameStore((state) => state.bankedCurrency);
  const bankedXp = useGameStore((state) => state.bankedXp);
  const ownedUpgradeIds = useGameStore((state) => state.ownedUpgradeIds);
  const equippedArmorId = useGameStore((state) => state.equippedArmorId);
  const purchaseUpgrade = useGameStore((state) => state.purchaseUpgrade);
  const equipArmor = useGameStore((state) => state.equipArmor);

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-amber-950 p-6 text-white">
      <h1 className="text-2xl font-bold">{t("hideout.title")}</h1>
      {justBanked && <p className="text-green-300">{t("hideout.bankedMessage")}</p>}
      <div className="flex gap-6">
        <span>
          {t("hud.currency")}: {bankedCurrency}
        </span>
        <span>
          {t("hud.xp")}: {bankedXp}
        </span>
      </div>
      <div className="w-full max-w-md">
        <h2 className="mb-2 text-lg font-semibold">{t("hideout.shopTitle")}</h2>
        <ul className="flex flex-col gap-2">
          {UPGRADES.map((upgrade) => {
            const owned = ownedUpgradeIds.includes(upgrade.id);
            const canAfford = bankedCurrency >= upgrade.cost;
            const isEquippedArmor = upgrade.kind === "armor" && equippedArmorId === upgrade.id;
            return (
              <li
                key={upgrade.id}
                className="flex items-center justify-between rounded bg-amber-900 px-3 py-2"
              >
                <span>
                  {upgrade.label[locale]} ({upgrade.cost})
                </span>
                {owned ? (
                  upgrade.kind === "armor" ? (
                    <button
                      type="button"
                      onClick={() => equipArmor(upgrade.id)}
                      disabled={isEquippedArmor}
                      className="rounded bg-blue-600 px-3 py-1 text-sm disabled:opacity-50"
                    >
                      {t("hideout.owned")}
                    </button>
                  ) : (
                    <span className="text-sm text-green-300">{t("hideout.owned")}</span>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => purchaseUpgrade(upgrade.id, upgrade.cost)}
                    disabled={!canAfford}
                    title={canAfford ? undefined : t("hideout.notEnoughCurrency")}
                    className="rounded bg-yellow-600 px-3 py-1 text-sm disabled:opacity-50"
                  >
                    {t("hideout.buy")}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <button type="button" onClick={onContinue} className="rounded bg-green-700 px-4 py-2">
        {t("hideout.continue")}
      </button>
    </div>
  );
}
