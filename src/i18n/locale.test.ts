import { describe, expect, it } from "vitest";
import { directionForLocale, localeLabel, LOCALES } from "./locale";

describe("locale", () => {
  it("lists exactly the three supported locales", () => {
    expect(LOCALES).toEqual(["en", "he", "ar"]);
  });

  it("marks English as left-to-right", () => {
    expect(directionForLocale("en")).toBe("ltr");
  });

  it("marks Hebrew and Arabic as right-to-left", () => {
    expect(directionForLocale("he")).toBe("rtl");
    expect(directionForLocale("ar")).toBe("rtl");
  });

  it("returns a native-script label for each locale", () => {
    expect(localeLabel("en")).toBe("English");
    expect(localeLabel("he")).toBe("עברית");
    expect(localeLabel("ar")).toBe("العربية");
  });
});
