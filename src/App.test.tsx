import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App";
import { useGameStore } from "@lib/persistence/store";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.setState({
      name: "",
      characterId: "",
      locale: "en",
      hpMax: 20,
      bankedCurrency: 0,
      bankedXp: 0,
      ownedUpgradeIds: [],
      equippedArmorId: null,
      hasSeenTutorial: false,
      defeatedEnemyIds: [],
    });
  });

  it("shows the welcome screen when there is no saved player", () => {
    render(<App />);
    expect(screen.getByText("Welcome to Kamal!")).toBeInTheDocument();
  });
});
