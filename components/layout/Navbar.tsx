"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWalletStore } from "@/store/walletStore";
import { formatCurrency, truncateAddress } from "@/lib/utils";
import {
  Shield,
  Layers,
  FileCheck2,
  Globe2,
  BarChart3,
  Wallet,
  Menu,
  X,
  ChevronDown,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const { address, isConnected, usdcBalance, connectWallet, disconnectWallet, selectedRole, setRole } = useWalletStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: Shield },
    { href: "/pools", label: "Micro Pools", icon: Layers },
    { href: "/claims", label: "Claims & Voting", icon: FileCheck2 },
    { href: "/anchors", label: "Fiat Ramps", icon: Globe2 },
    { href: "/analytics", label: "Proofs & Analytics", icon: BarChart3 },
  ];

  const handleWalletToggle = () => {
    if (isConnected) {
      disconnectWallet();
      toast.info("Wallet disconnected");
    } else {
      connectWallet("GBFRDG5ISAN5TRSFYF3RYP2ODFNKRPDBNZTN7SOSAIJA6JOBNMDN3GG2");
      toast.success("Connected Freighter Stellar Wallet!");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white font-sans">
                Gig<span className="text-emerald-400">Shield</span>
              </span>
              <span className="block text-[10px] text-zinc-400 font-mono -mt-1">
                P2P Stellar Insurance
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Wallet & Role Selector */}
          <div className="hidden sm:flex items-center gap-3">
            <select
              value={selectedRole}
              onChange={(e) => setRole(e.target.value as any)}
              className="bg-secondary/80 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-zinc-300 focus:outline-none"
            >
              <option value="worker">Role: Worker</option>
              <option value="validator">Role: Validator</option>
              <option value="admin">Role: Protocol Admin</option>
            </select>

            <button
              onClick={handleWalletToggle}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                isConnected
                  ? "bg-secondary/80 border-white/15 text-white hover:border-emerald-500/40"
                  : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent shadow-md hover:opacity-95"
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-400" />
              {isConnected ? (
                <div className="flex items-center gap-2">
                  <span className="font-mono">{truncateAddress(address || "")}</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {formatCurrency(usdcBalance)}
                  </span>
                </div>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-zinc-950/95 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-zinc-300"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-white/10 space-y-2">
            <button
              onClick={handleWalletToggle}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-medium text-xs py-3 rounded-xl"
            >
              <Wallet className="w-4 h-4" />
              {isConnected ? `Connected (${truncateAddress(address || "")})` : "Connect Wallet"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
