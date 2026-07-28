import { create } from "zustand";

export interface ClaimRecord {
  id: string;
  claimantAddress: string;
  profession: string;
  category: "medical_accident" | "equipment_damage" | "income_disruption";
  amountUSD: number;
  ipfsHash: string;
  description: string;
  yesVotes: number;
  noVotes: number;
  status: "pending" | "approved" | "rejected" | "settled";
  createdAt: string;
  expiresAt: string;
}

interface ClaimState {
  claims: ClaimRecord[];
  addClaim: (claim: Omit<ClaimRecord, "id" | "yesVotes" | "noVotes" | "status" | "createdAt" | "expiresAt">) => void;
  voteClaim: (claimId: string, approve: boolean) => void;
}

export const INITIAL_CLAIMS: ClaimRecord[] = [
  {
    id: "clm_101",
    claimantAddress: "GC6UDM7GORCSK2DEOYSTAXLC3P7DHPIHSYMLALO2QNPSOIFIWDPMIF4K",
    profession: "Delivery Rider",
    category: "medical_accident",
    amountUSD: 150.0,
    ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    description: "Minor road collision during delivery shift in Mumbai. Medical clinic bill for knee treatment.",
    yesVotes: 4,
    noVotes: 0,
    status: "approved",
    createdAt: "2026-07-28 10:15:00",
    expiresAt: "2026-07-29 10:15:00",
  },
  {
    id: "clm_102",
    claimantAddress: "GDMQSM6AGKJA3ME3BUZERORAXUNONBQML46ZLJRZNRTKTQJFYSDGYVPQ",
    profession: "Domestic Worker",
    category: "income_disruption",
    amountUSD: 80.0,
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    description: "Typhoon weather disruption in Manila preventing travel to work for 4 days.",
    yesVotes: 2,
    noVotes: 1,
    status: "pending",
    createdAt: "2026-07-28 12:30:00",
    expiresAt: "2026-07-29 12:30:00",
  },
  {
    id: "clm_103",
    claimantAddress: "GDQJNZXR63BH4Z54SILT7ESWUHJAUMIK3E2ON7LUZ4LKYI5PUOS2NN6X",
    profession: "Delivery Rider",
    category: "equipment_damage",
    amountUSD: 200.0,
    ipfsHash: "QmZtrR45749p6B3354t94h4f378g8f5793h7982fgh231x",
    description: "Electric delivery vehicle battery failure during monsoon rain. Repair receipt attached.",
    yesVotes: 3,
    noVotes: 0,
    status: "settled",
    createdAt: "2026-07-27 15:45:00",
    expiresAt: "2026-07-28 15:45:00",
  },
];

export const useClaimStore = create<ClaimState>((set) => ({
  claims: INITIAL_CLAIMS,
  addClaim: (newClaim) =>
    set((state) => ({
      claims: [
        {
          ...newClaim,
          id: `clm_${Date.now()}`,
          yesVotes: 0,
          noVotes: 0,
          status: "pending",
          createdAt: new Date().toISOString().replace("T", " ").substring(0, 19),
          expiresAt: new Date(Date.now() + 86400000).toISOString().replace("T", " ").substring(0, 19),
        },
        ...state.claims,
      ],
    })),
  voteClaim: (claimId, approve) =>
    set((state) => ({
      claims: state.claims.map((c) => {
        if (c.id !== claimId) return c;
        const newYes = approve ? c.yesVotes + 1 : c.yesVotes;
        const newNo = !approve ? c.noVotes + 1 : c.noVotes;
        let newStatus = c.status;
        if (newYes >= 3) newStatus = "approved";
        if (newNo >= 3) newStatus = "rejected";
        return { ...c, yesVotes: newYes, noVotes: newNo, status: newStatus };
      }),
    })),
}));
