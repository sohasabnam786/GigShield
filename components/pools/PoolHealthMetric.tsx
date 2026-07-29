"use client";

import React from "react";
import { ShieldCheck, Activity, TrendingUp, AlertTriangle } from "lucide-react";

interface PoolHealthMetricProps {
  poolName: string;
  reserveRatio: number; // e.g. 145%
  totalReservesUSD: number;
}

export default function PoolHealthMetric({ poolName, reserveRatio, totalReservesUSD }: PoolHealthMetricProps) {
  const isHealthy = reserveRatio >= 120;

  return (
    <div className="bg-secondary/40 border border-white/10 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-white font-mono">{poolName} Solvency & Health</span>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
            isHealthy
              ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
              : "bg-amber-950/80 text-amber-300 border-amber-500/40"
          }`}
        >
          {isHealthy ? "HEALTHY (OVER-COLLATERALIZED)" : "MODERATE"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <span className="text-zinc-400 text-[10px] block">Reserve Solvency Ratio</span>
          <span className="text-emerald-400 font-bold text-sm">{reserveRatio}%</span>
        </div>
        <div className="bg-black/30 p-2.5 rounded-xl border border-white/5">
          <span className="text-zinc-400 text-[10px] block">Total Capital Escrow</span>
          <span className="text-white font-bold text-sm">${totalReservesUSD.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
