import { create } from "zustand";

export interface MicroPool {
  id: string;
  name: string;
  profession: string;
  region: string;
  dailyContributionUSD: number;
  membersCount: number;
  totalReservesUSD: number;
  reserveRatio: number; // e.g. 340%
  activeClaimsCount: number;
  status: "active" | "full";
  icon: string;
}

interface PoolState {
  pools: MicroPool[];
  userContributionsUSD: number;
  userProtectionActive: boolean;
  addContribution: (amountUSD: number) => void;
  joinPool: (poolId: string) => void;
}

export const INITIAL_POOLS: MicroPool[] = [
  {
    id: "pool_delivery",
    name: "Delivery Riders Shield Pool",
    profession: "Delivery Rider",
    region: "India (UPI) & Nigeria (OPay)",
    dailyContributionUSD: 0.10,
    membersCount: 1420,
    totalReservesUSD: 42600.0,
    reserveRatio: 380,
    activeClaimsCount: 2,
    status: "active",
    icon: "🛵",
  },
  {
    id: "pool_domestic",
    name: "Domestic Workers Health Cover",
    profession: "Domestic Worker",
    region: "Philippines (GCash) & Kenya (M-Pesa)",
    dailyContributionUSD: 0.10,
    membersCount: 890,
    totalReservesUSD: 26700.0,
    reserveRatio: 410,
    activeClaimsCount: 1,
    status: "active",
    icon: "🧹",
  },
  {
    id: "pool_freelance",
    name: "Freelance Artisans Income Protection",
    profession: "Freelancer / Artisan",
    region: "Global (SEP-24 Anchor)",
    dailyContributionUSD: 0.15,
    membersCount: 640,
    totalReservesUSD: 19200.0,
    reserveRatio: 320,
    activeClaimsCount: 0,
    status: "active",
    icon: "💻",
  },
];

export const usePoolStore = create<PoolState>((set) => ({
  pools: INITIAL_POOLS,
  userContributionsUSD: 36.5,
  userProtectionActive: true,
  addContribution: (amountUSD) =>
    set((state) => ({
      userContributionsUSD: state.userContributionsUSD + amountUSD,
      userProtectionActive: true,
    })),
  joinPool: (poolId) =>
    set((state) => ({
      pools: state.pools.map((p) =>
        p.id === poolId ? { ...p, membersCount: p.membersCount + 1 } : p
      ),
    })),
}));
