import { create } from "zustand";

interface WalletState {
  address: string | null;
  isConnected: boolean;
  usdcBalance: number;
  xlmBalance: number;
  selectedRole: "worker" | "validator" | "admin";
  connectWallet: (addr: string) => void;
  disconnectWallet: () => void;
  setRole: (role: "worker" | "validator" | "admin") => void;
  updateBalances: (usdc: number, xlm: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  address: "GDSFFHT4YTWUFV4GI7KROZPPLN5LEEJPUR24HTO4BDJPGZVPV3PPKIOG",
  isConnected: true,
  usdcBalance: 125.5,
  xlmBalance: 45.8,
  selectedRole: "worker",
  connectWallet: (addr) => set({ address: addr, isConnected: true }),
  disconnectWallet: () => set({ address: null, isConnected: false }),
  setRole: (role) => set({ selectedRole: role }),
  updateBalances: (usdc, xlm) => set({ usdcBalance: usdc, xlmBalance: xlm }),
}));
