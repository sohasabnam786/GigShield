"use client";

import React from "react";
import Link from "next/link";
import MicroContributionCard from "@/components/dashboard/MicroContributionCard";
import ActiveProtectionCard from "@/components/dashboard/ActiveProtectionCard";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Users, FileCheck2, ArrowRight, HeartPulse, Sparkles, Lock, Coins } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Header */}
      <div className="relative overflow-hidden glass-panel rounded-3xl p-8 border border-emerald-500/20 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-emerald-950/30 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Powered by Stellar Sub-Cent Fees & Soroban
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Peer-to-Peer Micro-Insurance for <span className="text-emerald-400">1.1 Billion Gig Workers</span>
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed">
              GigShield enables delivery riders, domestic workers, and freelancers to pool $0.10/day micro-contributions.
              Automated claims processing via stake-weighted peer voting on Soroban smart contracts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/pools"
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg transition-all"
            >
              Explore Micro Pools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/claims"
              className="flex items-center justify-center gap-2 bg-secondary/80 hover:bg-secondary text-white text-xs font-bold px-5 py-3 rounded-xl border border-white/10 transition-all"
            >
              Submit / Vote Claims
            </Link>
          </div>
        </div>

        {/* Protocol Metric Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-center font-mono">
          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Total Active Pools</span>
            <div className="text-2xl font-extrabold text-white">3 Pools</div>
            <span className="text-[10px] text-emerald-400">Delivery, Domestic, Freelance</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Protected Workers</span>
            <div className="text-2xl font-extrabold text-emerald-400">2,950</div>
            <span className="text-[10px] text-zinc-400">India, PH, Kenya, Nigeria</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Community Reserves</span>
            <div className="text-2xl font-extrabold text-white">{formatCurrency(88500)}</div>
            <span className="text-[10px] text-emerald-400">370% Reserve Ratio</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider">Stellar Gas Fee</span>
            <div className="text-2xl font-extrabold text-teal-400">&lt; $0.0001</div>
            <span className="text-[10px] text-zinc-400">Sub-cent micro-payments</span>
          </div>
        </div>
      </div>

      {/* Grid Section: Micro Contribution + Active Protection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MicroContributionCard />
        <ActiveProtectionCard />
      </div>
    </div>
  );
}
