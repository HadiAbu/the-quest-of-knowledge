import { useTranslation } from "@i18n/useTranslation";
import { useGameStore } from "@lib/persistence/store";

type HudProps = {
  hp: number;
  currency: number;
  xp: number;
};

export function Hud({ hp, currency, xp }: HudProps) {
  const { t } = useTranslation();
  const hpMax = useGameStore((state) => state.hpMax);

  return (
    <div className="flex gap-6 rounded bg-slate-800 px-4 py-2 text-white">
      <span>
        {t("hud.hp")}: {hp}/{hpMax}
      </span>
      <span>
        {t("hud.currency")}: {currency}
      </span>
      <span>
        {t("hud.xp")}: {xp}
      </span>
    </div>
  );
}
