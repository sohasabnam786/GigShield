import { describe, it, expect, beforeEach } from "vitest";
import { useClaimStore, INITIAL_CLAIMS } from "@/store/claimStore";

describe("Claim Governance Store", () => {
  beforeEach(() => {
    useClaimStore.setState({
      claims: INITIAL_CLAIMS,
      userValidatorReputation: 120,
    });
  });

  it("should initialize with pre-loaded governance claims", () => {
    const state = useClaimStore.getState();
    expect(state.claims.length).toBeGreaterThan(0);
    expect(state.userValidatorReputation).toBe(120);
  });

  it("should allow a validator to cast an approving vote on a claim", () => {
    const targetClaim = INITIAL_CLAIMS[0];
    const initialYesVotes = targetClaim.yesVotes;

    const { voteOnClaim } = useClaimStore.getState();
    voteOnClaim(targetClaim.id, true);

    const updatedClaim = useClaimStore.getState().claims.find((c) => c.id === targetClaim.id);
    expect(updatedClaim?.yesVotes).toBe(initialYesVotes + 1);
  });
});
