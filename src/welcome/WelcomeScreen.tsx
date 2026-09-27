import { useState } from "react";
import type { Locale } from "@/types/game";
import { STRINGS, type StringId } from "@i18n/strings";
import { LOCALES, localeLabel } from "@i18n/locale";
import { CHARACTERS } from "@content/characters";
import { useGameStore } from "@lib/persistence/store";

type WelcomeScreenProps = {
  onComplete: () => void;
};

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const setProfile = useGameStore((state) => state.setProfile);
  const [name, setName] = useState("");
  const [characterId, setCharacterId] = useState(CHARACTERS[0].id);
  const [locale, setLocale] = useState<Locale>("en");

  const t = (id: StringId): string => STRINGS[id][locale];

  function handleStart() {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setProfile(trimmedName, characterId, locale);
    onComplete();
  }

  return (
    <div
      dir={locale === "en" ? "ltr" : "rtl"}
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-indigo-950 p-6 text-white"
    >
      <h1 className="text-3xl font-bold">{t("welcome.title")}</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="player-name">{t("welcome.namePrompt")}</label>
        <input
          id="player-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded bg-white px-3 py-2 text-black"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span>{t("welcome.characterPrompt")}</span>
        <div className="flex gap-2">
          {CHARACTERS.map((character) => (
            <button
              key={character.id}
              type="button"
              onClick={() => setCharacterId(character.id)}
              className={`rounded px-3 py-2 ${
                characterId === character.id ? "bg-yellow-600" : "bg-indigo-800"
              }`}
            >
              {character.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span>{t("welcome.languagePrompt")}</span>
        <div className="flex gap-2">
          {LOCALES.map((candidate) => (
            <button
              key={candidate}
              type="button"
              onClick={() => setLocale(candidate)}
              className={`rounded px-3 py-2 ${
                locale === candidate ? "bg-yellow-600" : "bg-indigo-800"
              }`}
            >
              {localeLabel(candidate)}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleStart}
        disabled={!name.trim()}
        className="rounded bg-green-600 px-6 py-3 text-lg disabled:opacity-50"
      >
        {t("welcome.start")}
      </button>
    </div>
  );
}
