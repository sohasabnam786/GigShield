import { Horizon, Keypair } = require("@stellar/stellar-sdk");

export const STELLAR_NETWORK = {
  networkPassphrase: "Test SDF Network ; July 2015",
  horizonUrl: "https://horizon-testnet.stellar.org",
  sorobanRpcUrl: "https://soroban-testnet.stellar.org",
};

// Fresh Soroban Smart Contract Deployment Addresses on Stellar Testnet
export const CONTRACT_ADDRESSES = {
  poolManager: "CCPHYXQKDZFMOVWLDTCTA4VJKIKL3IBGMPV5TXVDJGANZ2JXWKNYST5A",
  claimGovernance: "CBRE5U4G4Y2FGJ5UZFBLA5GSDU45QEE32SSIPKM7ICXGHZZWC4B7BUHZ",
  settlementEngine: "CBYQ6RNYEKD3XZJWNL7LR7QCI6ME44YG64YLLG5HDZNSCBMD5X4KFZDT",
  usdcToken: "CCW67TSZV3SSS2HXMBQ5JFGCKJNXKZM7UQUWUZXE2ST4R3A6TXP2RPN0", // Testnet USDC Asset Anchor
  deployerAccount: "GCO3IQQ7RNH7TB3FDJCKS3ZM3YHHVNGD42RN5RWQ3QESY7KIZVYURRQT",
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
