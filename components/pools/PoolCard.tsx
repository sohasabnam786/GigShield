"use client";

import React from "react";
import { MicroPool, usePoolStore } from "@/store/poolStore";
import { formatCurrency } from "@/lib/utils";
import { Users, Shield, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface PoolCardProps {
  pool: MicroPool;
}

export default function PoolCard({ pool }: PoolCardProps) {
  const { joinPool } = usePoolStore();

  const handleJoin = () => {
    joinPool(pool.id);
    toast.success(`Successfully joined ${pool.name}!`);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-5 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl p-3 bg-secondary/80 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
            {pool.icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
              {pool.name}
            </h3>
            <span className="text-xs text-zinc-400 font-mono">{pool.region}</span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
          Reserve Ratio: {pool.reserveRatio}%
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center text-xs">
        <div>
          <span className="text-zinc-500 block text-[10px] uppercase font-mono">Daily Rate</span>
          <span className="font-mono font-bold text-emerald-400">{formatCurrency(pool.dailyContributionUSD)}</span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px] uppercase font-mono">Members</span>
          <span className="font-mono font-bold text-white flex items-center justify-center gap-1">
            <Users className="w-3 h-3 text-zinc-400" /> {pool.membersCount}
          </span>
        </div>
        <div>
          <span className="text-zinc-500 block text-[10px] uppercase font-mono">Reserves</span>
          <span className="font-mono font-bold text-white">{formatCurrency(pool.totalReservesUSD)}</span>
        </div>
      </div>

      <button
        onClick={handleJoin}
        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-emerald-600/90 hover:text-white border border-white/10 text-zinc-200 font-medium text-xs py-2.5 rounded-xl transition-all"
      >
        <Shield className="w-4 h-4 text-emerald-400 group-hover:text-white" />
        Join Pool & Activate Coverage
      </button>
    </div>
  );
}
