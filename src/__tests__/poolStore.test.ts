import { describe, it, expect, beforeEach } from "vitest";
import { usePoolStore, INITIAL_POOLS } from "@/store/poolStore";

describe("Pool Store", () => {
  beforeEach(() => {
    usePoolStore.setState({
      pools: INITIAL_POOLS,
      userContributionsUSD: 36.5,
      userProtectionActive: true,
    });
  });

  it("should increase contribution on deposit", () => {
    const { addContribution } = usePoolStore.getState();
    addContribution(3.0);

    const state = usePoolStore.getState();
    expect(state.userContributionsUSD).toBe(39.5);
    expect(state.userProtectionActive).toBe(true);
  });
});
