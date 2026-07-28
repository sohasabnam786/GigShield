import React from "react";
import { Shield, Award, UserCheck, CheckCircle2, Lock } from "lucide-react";

export default function GovernancePage() {
  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
          <Award className="w-3.5 h-3.5" /> Stake-Weighted Peer Governance
        </div>
        <h1 className="text-3xl font-extrabold text-white">Validator Reputation & Sybil Defense</h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          GigShield prevents claim fraud through stake-weighted validator voting, reputation scoring, and peer consensus thresholds on Soroban.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2 text-center">
          <div className="text-xs text-zinc-400">Your Reputation Score</div>
          <div className="text-3xl font-extrabold text-emerald-400">98 / 100</div>
          <div className="text-[11px] text-emerald-300">Level: Senior Peer Validator</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2 text-center">
          <div className="text-xs text-zinc-400">Active Voting Power</div>
          <div className="text-3xl font-extrabold text-purple-400">1.45x Stake</div>
          <div className="text-[11px] text-zinc-400">Based on 12 months history</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2 text-center">
          <div className="text-xs text-zinc-400">Total Validated Claims</div>
          <div className="text-3xl font-extrabold text-cyan-400">14 Claims</div>
          <div className="text-[11px] text-zinc-400">0 Collusion Penalties</div>
        </div>
      </div>
    </div>
  );
}
