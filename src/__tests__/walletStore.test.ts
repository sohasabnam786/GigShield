import { describe, it, expect, beforeEach } from "vitest";
import { useWalletStore } from "@/store/walletStore";

describe("Wallet Store", () => {
  beforeEach(() => {
    useWalletStore.setState({
      address: null,
      isConnected: false,
      usdcBalance: 0,
      xlmBalance: 0,
      selectedRole: "worker",
    });
  });

  it("should connect wallet and set address", () => {
    const { connectWallet } = useWalletStore.getState();
    connectWallet("GC6UDM7GORCSK2DEOYSTAXLC3P7DHPIHSYMLALO2QNPSOIFIWDPMIF4K");

    const state = useWalletStore.getState();
    expect(state.isConnected).toBe(true);
    expect(state.address).toBe("GC6UDM7GORCSK2DEOYSTAXLC3P7DHPIHSYMLALO2QNPSOIFIWDPMIF4K");
  });

  it("should disconnect wallet", () => {
    const { connectWallet, disconnectWallet } = useWalletStore.getState();
    connectWallet("GC6UDM7GORCSK2DEOYSTAXLC3P7DHPIHSYMLALO2QNPSOIFIWDPMIF4K");
    disconnectWallet();

    const state = useWalletStore.getState();
    expect(state.isConnected).toBe(false);
    expect(state.address).toBeNull();
  });
});
