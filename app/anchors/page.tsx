"use client";

import React, { useState } from "react";
import { SUPPORTED_ANCHORS, initiateSEP24Deposit } from "@/lib/sep24";
import { Globe2, ArrowUpRight, CheckCircle2, Shield } from "lucide-react";
import { toast } from "sonner";

export default function AnchorsPage() {
  const [selectedAnchor, setSelectedAnchor] = useState(SUPPORTED_ANCHORS[0]);
  const [amount, setAmount] = useState(500);
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    setLoading(true);
    const res = await initiateSEP24Deposit(selectedAnchor.id, amount, "USDC");
    toast.success(`SEP-24 deposit initiated via ${selectedAnchor.name}! Transferring ${amount} ${selectedAnchor.currency} to USDC.`);
    setLoading(false);
  };

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30">
          <Globe2 className="w-3.5 h-3.5" /> SEP-24 Stellar Anchors Integration
        </div>
        <h1 className="text-3xl font-extrabold text-white">Local Fiat Mobile Money On & Off Ramps</h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
          Gig workers deposit local currency (UPI, M-Pesa, GCash, OPay) directly through regulated Stellar Anchors into USDC risk pools without touching complex crypto exchanges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Anchor Selector */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold text-white">Select Regional Fiat Anchor</h3>
          <div className="space-y-3">
            {SUPPORTED_ANCHORS.map((anchor) => {
              const isSelected = selectedAnchor.id === anchor.id;
              return (
                <button
                  key={anchor.id}
                  onClick={() => setSelectedAnchor(anchor)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? "bg-teal-500/15 border-teal-500 text-white"
                      : "bg-secondary/40 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{anchor.logo}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm">{anchor.name}</h4>
                      <p className="text-xs text-zinc-400">{anchor.paymentMethods.join(" • ")}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-400">{anchor.depositFee} fee</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deposit Card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{selectedAnchor.logo}</span> Deposit {selectedAnchor.currency} via {selectedAnchor.name}
            </h3>

            <div className="space-y-2 text-xs">
              <label className="text-zinc-300 font-mono">Amount in Local Currency ({selectedAnchor.currency})</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-secondary border border-white/10 rounded-xl px-4 py-3 text-lg font-mono font-bold text-white focus:outline-none"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                <span>Estimated USDC Received: <strong className="text-emerald-400">~${(amount / 83.5).toFixed(2)} USDC</strong></span>
                <span>Settlement Speed: <strong className="text-white">{selectedAnchor.settlementTime}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDeposit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {loading ? "Connecting SEP-24 Anchor..." : `Initiate One-Tap ${selectedAnchor.currency} Deposit`}
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
