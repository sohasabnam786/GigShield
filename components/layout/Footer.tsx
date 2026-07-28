import React from "react";
import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";
import { CONTRACT_ADDRESSES } from "@/lib/stellar";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 py-10 mt-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white">GigShield</span>
          </div>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Community-owned peer-to-peer micro-insurance protocol built on Stellar & Soroban for 1.1 billion gig workers worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Protocol</h4>
          <ul className="space-y-2">
            <li><Link href="/pools" className="hover:text-white transition-colors">Micro Pools</Link></li>
            <li><Link href="/claims" className="hover:text-white transition-colors">Claim Governance</Link></li>
            <li><Link href="/anchors" className="hover:text-white transition-colors">SEP-24 Fiat Ramps</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Soroban Contracts</h4>
          <ul className="space-y-2 font-mono text-[11px]">
            <li>
              <a
                href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ADDRESSES.poolManager}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1"
              >
                PoolManager <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ADDRESSES.claimGovernance}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1"
              >
                ClaimGovernance <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a
                href={`https://stellar.expert/explorer/testnet/contract/${CONTRACT_ADDRESSES.settlementEngine}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 flex items-center gap-1"
              >
                SettlementEngine <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Rise In Level 4</h4>
          <p className="text-zinc-400 text-xs leading-relaxed">
            Built for Rise In Green Belt Level 4 Submission. Smart contracts deployed on Stellar Testnet.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 GigShield Protocol. All rights reserved.</p>
        <span className="text-[11px] font-mono text-emerald-400/80">Powered by Stellar & Soroban Testnet</span>
      </div>
    </footer>
  );
}
