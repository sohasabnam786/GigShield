"use client";

import React from "react";
import PoolCard from "@/components/pools/PoolCard";
import { usePoolStore } from "@/store/poolStore";
import { Layers, ShieldCheck, Info } from "lucide-react";

export default function PoolsPage() {
  const { pools } = usePoolStore();

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" /> Community-Owned Risk Pools
        </div>
        <h1 className="text-3xl font-extrabold text-white">Micro-Insurance Pools</h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Workers in the same profession pool daily $0.10 micro-contributions. Reserve ratios automatically adjust based on historical claim frequency on Soroban.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-start gap-4 text-xs text-zinc-300">
        <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-white text-sm">How Pool Reserves Work on Soroban</h4>
          <p>
            100% of daily micro-contributions are locked directly inside the <code>PoolManager</code> Soroban smart contract.
            When a claim is approved by 66% peer validator consensus, the <code>SettlementEngine</code> automatically transfers USDC funds to the claimant.
          </p>
        </div>
      </div>
    </div>
  );
}
