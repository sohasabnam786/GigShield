"use client";

import React from "react";
import { ClaimRecord, useClaimStore } from "@/store/claimStore";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";

interface ClaimCardProps {
  claim: ClaimRecord;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const { voteClaim } = useClaimStore();

  const handleVote = (approve: boolean) => {
    voteClaim(claim.id, approve);
    toast.success(approve ? "Voted to approve claim!" : "Voted to reject claim!");
  };

  const statusBadge = {
    pending: { label: "Peer Voting Active", color: "bg-amber-950/80 text-amber-300 border-amber-500/40", icon: Clock },
    approved: { label: "Approved by Consensus", color: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40", icon: CheckCircle2 },
    rejected: { label: "Rejected", color: "bg-rose-950/80 text-rose-300 border-rose-500/40", icon: XCircle },
    settled: { label: "Settled on Stellar Testnet", color: "bg-teal-950/80 text-teal-300 border-teal-500/40", icon: CheckCircle2 },
  }[claim.status];

  const StatusIcon = statusBadge.icon;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-zinc-400 font-bold">{claim.id}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary text-zinc-300 capitalize">
              {claim.profession}
            </span>
          </div>
          <p className="text-xs text-zinc-300 font-mono mt-1">
            Claimant: {truncateAddress(claim.claimantAddress, 6)}
          </p>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${statusBadge.color}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {statusBadge.label}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Claim Amount:</span>
          <span className="font-mono font-extrabold text-white text-sm">{formatCurrency(claim.amountUSD)}</span>
        </div>
        <p className="text-zinc-300 bg-secondary/40 p-3 rounded-xl border border-white/5 italic">
          &quot;{claim.description}&quot;
        </p>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 font-mono">
          <span>IPFS Evidence Hash: <code className="text-cyan-300">{claim.ipfsHash.slice(0, 12)}...</code></span>
          <span>Submitted: {claim.createdAt}</span>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-emerald-400 font-bold">Approved Votes: {claim.yesVotes} / 3</span>
          <span className="text-rose-400 font-bold">Rejected Votes: {claim.noVotes} / 3</span>
        </div>

        {claim.status === "pending" && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleVote(true)}
              className="flex items-center justify-center gap-1.5 bg-emerald-600/90 hover:bg-emerald-600 text-white font-medium text-xs py-2 rounded-xl transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" /> Approve Claim
            </button>
            <button
              onClick={() => handleVote(false)}
              className="flex items-center justify-center gap-1.5 bg-rose-600/90 hover:bg-rose-600 text-white font-medium text-xs py-2 rounded-xl transition-colors"
            >
              <ThumbsDown className="w-3.5 h-3.5" /> Reject Claim
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
