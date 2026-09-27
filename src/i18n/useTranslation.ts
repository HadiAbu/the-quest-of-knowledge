import { useGameStore } from "@lib/persistence/store";
import { STRINGS, type StringId } from "./strings";

export function useTranslation() {
  const locale = useGameStore((state) => state.locale);
  const t = (id: StringId): string => STRINGS[id][locale];
  return { t, locale };
}
