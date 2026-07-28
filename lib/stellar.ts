import { Horizon } from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = {
  networkPassphrase: "Test SDF Network ; July 2015",
  horizonUrl: "https://horizon-testnet.stellar.org",
  sorobanRpcUrl: "https://soroban-testnet.stellar.org",
};

// Verified Live Soroban Smart Contract Deployment Addresses on Stellar Testnet Ledger
export const CONTRACT_ADDRESSES = {
  poolManager: "CCQSJIGQIRZ4THGHQKND35AVGGAJXGYORZQQ5D6A4UEZG3TUZWVI6YAR",
  claimGovernance: "CDZEP67LRD6FACWRX5UYVZANRT5RGEBUF33BQVYVDOFGSJG5MAZEBNAM",
  settlementEngine: "CBKZZDUGIK5BW74UJKCAXLLPW37NQIKME3MCAIU34MHAONJQQNM4PKGR",
  usdcToken: "CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZXE2ST4R3A6TXP2RPN0", // Testnet USDC Asset Anchor
  deployerAccount: "GCIJZKV5R2HZMJXORVEICVASFQJAJJAHCZTITWOETN7ATAFEF2UYDZAD",
  wasmHashUploadTx: "20dad70c45169781e5c735ebbcb83e5c3a33695a9ddd31a5f1f91bae07d9c1a3",
  contractDeployTx: "03e1011d977dfec46c6b2b07e6b75ac470fb381fad4f3d6f72927678db9433f7",
};

export const horizonServer = new Horizon.Server(STELLAR_NETWORK.horizonUrl);

/**
 * Fetches account details and balances from Stellar Testnet Horizon RPC
 * @param publicKey 56-character G-address public key
 * @returns Horizon account response or null on error
 */
export async function fetchAccountDetails(publicKey: string) {
  try {
    const account = await horizonServer.loadAccount(publicKey);
    return account;
  } catch (error) {
    console.error("Error fetching Stellar account:", error);
    return null;
  }
}
