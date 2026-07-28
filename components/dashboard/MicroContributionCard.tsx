"use client";

import React, { useState } from "react";
import { usePoolStore } from "@/store/poolStore";
import { useWalletStore } from "@/store/walletStore";
import { formatCurrency } from "@/lib/utils";
import { Coins, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function MicroContributionCard() {
  const { addContribution, userContributionsUSD } = usePoolStore();
  const { address } = useWalletStore();
  const [selectedPlan, setSelectedPlan] = useState<"daily" | "weekly" | "monthly">("daily");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const planAmounts = {
    daily: 0.10,
    weekly: 0.70,
    monthly: 3.00,
  };

  const handleDeposit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const amount = planAmounts[selectedPlan];
    addContribution(amount);
    toast.success(`Deposited ${formatCurrency(amount)} micro-contribution to Delivery Riders Shield Pool on Stellar!`);
    setIsSubmitting(false);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-zinc-900/60 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Daily Micro-Contribution</h3>
            <p className="text-xs text-zinc-400">Sub-cent gas fees on Stellar make $0.10/day coverage viable</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Active Protection
        </span>
      </div>

      {/* Plan selector */}
      <div className="grid grid-cols-3 gap-3">
        {(["daily", "weekly", "monthly"] as const).map((plan) => {
          const isSelected = selectedPlan === plan;
          return (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                  : "bg-secondary/40 border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              <div className="text-[11px] uppercase tracking-wider font-mono font-semibold capitalize text-zinc-400">
                {plan}
              </div>
              <div className="text-lg font-extrabold text-white mt-1 font-mono">
                {formatCurrency(planAmounts[plan])}
              </div>
              <div className="text-[10px] text-emerald-400 mt-0.5">
                {plan === "daily" ? "$0.10 per day" : plan === "weekly" ? "$0.70 per wk" : "$3.00 per mo"}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Button */}
      <button
        onClick={handleDeposit}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm py-3 rounded-xl shadow-lg hover:opacity-95 transition-opacity"
      >
        <Sparkles className="w-4 h-4" />
        {isSubmitting ? "Processing on Soroban..." : `Deposit ${formatCurrency(planAmounts[selectedPlan])} via Stellar Escrow`}
      </button>

      <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5 font-mono">
        <span>Total Contributed: <strong className="text-emerald-400">{formatCurrency(userContributionsUSD)}</strong></span>
        <span>Stellar Gas Fee: <strong className="text-zinc-200">&lt; $0.0001</strong></span>
      </div>
    </div>
  );
}
