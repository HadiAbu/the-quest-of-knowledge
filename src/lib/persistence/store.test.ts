import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "./store";

function resetStore() {
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
}

describe("useGameStore", () => {
  beforeEach(() => {
    resetStore();
    localStorage.clear();
  });

  it("sets the player's profile", () => {
    useGameStore.getState().setProfile("Ari", "knight", "he");
    const state = useGameStore.getState();
    expect(state.name).toBe("Ari");
    expect(state.characterId).toBe("knight");
    expect(state.locale).toBe("he");
  });

  it("marks the tutorial as seen", () => {
    useGameStore.getState().markTutorialSeen();
    expect(useGameStore.getState().hasSeenTutorial).toBe(true);
  });

  it("marks an enemy as defeated, idempotently", () => {
    useGameStore.getState().markEnemyDefeated("slime");
    useGameStore.getState().markEnemyDefeated("slime");
    expect(useGameStore.getState().defeatedEnemyIds).toEqual(["slime"]);
  });

  it("banks run currency and XP into the saved totals", () => {
    useGameStore.getState().bankRun({ currency: 10, xp: 4 });
    useGameStore.getState().bankRun({ currency: 5, xp: 1 });
    const state = useGameStore.getState();
    expect(state.bankedCurrency).toBe(15);
    expect(state.bankedXp).toBe(5);
  });

  it("purchases an upgrade when there is enough banked currency", () => {
    useGameStore.setState({ bankedCurrency: 20 });
    const success = useGameStore.getState().purchaseUpgrade("armor-leather", 20);
    const state = useGameStore.getState();
    expect(success).toBe(true);
    expect(state.bankedCurrency).toBe(0);
    expect(state.ownedUpgradeIds).toEqual(["armor-leather"]);
  });

  it("refuses to purchase an upgrade without enough banked currency", () => {
    useGameStore.setState({ bankedCurrency: 5 });
    const success = useGameStore.getState().purchaseUpgrade("armor-leather", 20);
    const state = useGameStore.getState();
    expect(success).toBe(false);
    expect(state.bankedCurrency).toBe(5);
    expect(state.ownedUpgradeIds).toEqual([]);
  });

  it("refuses to purchase an upgrade that is already owned", () => {
    useGameStore.setState({ bankedCurrency: 100, ownedUpgradeIds: ["armor-leather"] });
    const success = useGameStore.getState().purchaseUpgrade("armor-leather", 20);
    expect(success).toBe(false);
    expect(useGameStore.getState().bankedCurrency).toBe(100);
  });

  it("equips an owned armor upgrade", () => {
    useGameStore.setState({ ownedUpgradeIds: ["armor-leather"] });
    useGameStore.getState().equipArmor("armor-leather");
    expect(useGameStore.getState().equippedArmorId).toBe("armor-leather");
  });

  it("persists banked state to localStorage under the 'kamal-save' key", () => {
    useGameStore.getState().bankRun({ currency: 3, xp: 1 });
    const raw = localStorage.getItem("kamal-save");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.state.bankedCurrency).toBe(3);
  });
});
