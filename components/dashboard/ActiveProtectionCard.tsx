import React from "react";
import { ShieldCheck, HeartPulse, Stethoscope, AlertTriangle, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ActiveProtectionCard() {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white">Your Income & Health Protection</h3>
          <p className="text-xs text-zinc-400 font-mono">Active Pool: Delivery Riders Shield Pool (India-UPI / Nigeria)</p>
        </div>
        <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold font-mono flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Covered
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-secondary/40 border border-white/5 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
            <HeartPulse className="w-4 h-4 text-emerald-400" /> Medical Cover
          </div>
          <div className="text-xl font-bold text-white font-mono">{formatCurrency(500)}</div>
          <div className="text-[10px] text-zinc-500">Instant payout on injury</div>
        </div>

        <div className="bg-secondary/40 border border-white/5 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Income Disruption
          </div>
          <div className="text-xl font-bold text-white font-mono">{formatCurrency(250)}</div>
          <div className="text-[10px] text-zinc-500">Severe weather / illness</div>
        </div>

        <div className="bg-secondary/40 border border-white/5 p-4 rounded-xl space-y-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
            <Stethoscope className="w-4 h-4 text-teal-400" /> Equipment Damage
          </div>
          <div className="text-xl font-bold text-white font-mono">{formatCurrency(300)}</div>
          <div className="text-[10px] text-zinc-500">Vehicle / bike repair</div>
        </div>
      </div>
    </div>
  );
}
