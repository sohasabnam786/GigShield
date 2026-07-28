import { Horizon, Networks } from "@stellar/stellar-sdk";

export const STELLAR_NETWORK = {
  networkPassphrase: Networks.TESTNET,
  horizonUrl: "https://horizon-testnet.stellar.org",
  sorobanRpcUrl: "https://soroban-testnet.stellar.org",
};

export const CONTRACT_ADDRESSES = {
  POOL_MANAGER: "CCCOM4GDC6VFLEPG2AN7NSSUMVYXUDEWSNL5DNFZZOCNBWN3XU3AURYC",
  CLAIM_GOVERNANCE: "CBMFYE434L3XK4XSTFDXRPABU3KOFRFOKABEUOGTCGTPGLASYB2GF4LA",
  SETTLEMENT_ENGINE: "CAGIFCUOWD3W4QMWMK2ZLZNYJOLF6HHNQ4K2UGFQGB7MXUSLOWDVWVS2",
};

export const horizonServer = new Horizon.Server(STELLAR_NETWORK.horizonUrl);

export async function checkAccountExists(address: string): Promise<boolean> {
  try {
    await horizonServer.loadAccount(address);
    return true;
  } catch (err) {
    return false;
  }
}
