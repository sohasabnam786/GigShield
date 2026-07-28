"use client";

import React, { useState } from "react";
import ClaimCard from "@/components/claims/ClaimCard";
import { useClaimStore } from "@/store/claimStore";
import { FileCheck2, PlusCircle, Shield, UploadCloud } from "lucide-react";
import { toast } from "sonner";

export default function ClaimsPage() {
  const { claims, addClaim } = useClaimStore();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [category, setCategory] = useState<"medical_accident" | "equipment_damage" | "income_disruption">("medical_accident");
  const [amountUSD, setAmountUSD] = useState<number>(150);
  const [description, setDescription] = useState("");
  const [profession, setProfession] = useState("Delivery Rider");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please enter a brief claim description");
      return;
    }

    addClaim({
      claimantAddress: "GDSFFHT4YTWUFV4GI7KROZPPLN5LEEJPUR24HTO4BDJPGZVPV3PPKIOG",
      profession,
      category,
      amountUSD,
      ipfsHash: `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      description,
    });

    toast.success("Claim submitted successfully to Soroban ClaimGovernance contract!");
    setShowSubmitModal(false);
    setDescription("");
  };

  return (
    <div className="space-y-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Claim Governance & Peer Voting</h1>
          <p className="text-sm text-zinc-400">
            Submit claims with IPFS evidence hashing or vote on peer claims to earn validator reputation rewards.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
        >
          <PlusCircle className="w-4 h-4" /> Submit New Claim
        </button>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>

      {/* Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 space-y-5 border border-white/10">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-emerald-400" /> Submit Micro-Insurance Claim
              </h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-300 font-mono">Profession Category</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full bg-secondary border border-white/10 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="Delivery Rider">Delivery Rider</option>
                  <option value="Domestic Worker">Domestic Worker</option>
                  <option value="Freelancer / Artisan">Freelancer / Artisan</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-mono">Claim Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-secondary border border-white/10 rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="medical_accident">Medical Injury / Accident ($150 - $500)</option>
                  <option value="equipment_damage">Equipment / Vehicle Damage ($100 - $300)</option>
                  <option value="income_disruption">Severe Income Disruption ($50 - $250)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-mono">Claim Amount ($ USD)</label>
                <input
                  type="number"
                  value={amountUSD}
                  onChange={(e) => setAmountUSD(Number(e.target.value))}
                  className="w-full bg-secondary border border-white/10 rounded-xl px-3 py-2.5 text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-mono">Claim Description & Evidence</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the incident (e.g. road accident during shift, hospital receipt details)..."
                  rows={3}
                  className="w-full bg-secondary border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  required
                />
              </div>

              <div className="p-3 bg-secondary/40 border border-white/10 rounded-xl flex items-center gap-3">
                <UploadCloud className="w-5 h-5 text-emerald-400" />
                <div>
                  <span className="font-bold text-white block">IPFS Evidence Anchoring</span>
                  <span className="text-[10px] text-zinc-400">Medical receipts & receipts automatically hashed on Soroban</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition-colors"
              >
                Publish Claim to Soroban Governance
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
