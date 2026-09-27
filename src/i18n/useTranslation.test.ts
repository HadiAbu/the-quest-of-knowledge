import { beforeEach, describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useGameStore } from "@lib/persistence/store";
import { useTranslation } from "./useTranslation";

describe("useTranslation", () => {
  beforeEach(() => {
    useGameStore.setState({ locale: "en" });
  });

  it("exposes the store's current locale", () => {
    useGameStore.setState({ locale: "he" });
    const { result } = renderHook(() => useTranslation());
    expect(result.current.locale).toBe("he");
  });

  it("looks up a string in the current locale", () => {
    useGameStore.setState({ locale: "ar" });
    const { result } = renderHook(() => useTranslation());
    expect(result.current.t("welcome.start")).toBe("ابدأ");
  });

  it("returns different text for the same string id across locales", () => {
    useGameStore.setState({ locale: "en" });
    const english = renderHook(() => useTranslation());
    expect(english.result.current.t("welcome.start")).toBe("Start");

    useGameStore.setState({ locale: "he" });
    const hebrew = renderHook(() => useTranslation());
    expect(hebrew.result.current.t("welcome.start")).toBe("התחל");
  });
});
