import { Horizon } from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = {
  networkPassphrase: "Test SDF Network ; July 2015",
  horizonUrl: "https://horizon-testnet.stellar.org",
  sorobanRpcUrl: "https://soroban-testnet.stellar.org",
};

// Fresh Soroban Smart Contract Deployment Addresses on Stellar Testnet
export const CONTRACT_ADDRESSES = {
  poolManager: "CCJWXC7WJ2NA2MXQIGSLI5PFYHBRBKXIWMOGTSZPQVDKDDL7HBFQYVL5",
  claimGovernance: "CDZEP67LRD6FACWRX5UYVZANRT5RGEBUF33BQVYVDOFGSJG5MAZEBNAM",
  settlementEngine: "CBKZZDUGIK5BW74UJKCAXLLPW37NQIKME3MCAIU34MHAONJQQNM4PKGR",
  usdcToken: "CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZXE2ST4R3A6TXP2RPN0", // Testnet USDC Asset Anchor
  deployerAccount: "GCIJZKV5R2HZMJXORVEICVASFQJAJJAHCZTITWOETN7ATAFEF2UYDZAD",
};

export const horizonServer = new Horizon.Server(STELLAR_NETWORK.horizonUrl);

export async function fetchAccountDetails(publicKey: string) {
  try {
    const account = await horizonServer.loadAccount(publicKey);
    return account;
  } catch (error) {
    console.error("Error fetching Stellar account:", error);
    return null;
  }
}
