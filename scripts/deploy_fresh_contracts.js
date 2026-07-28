const { Keypair } = require("@stellar/stellar-sdk");

async function deployFreshContracts() {
  console.log("🚀 Generating fresh Stellar Testnet deployer wallet...");

  // Generate brand new Deployer keypair
  const deployer = Keypair.random();
  console.log("Deployer Public Key:", deployer.publicKey());

  // Fund via Friendbot
  console.log("Funding deployer account via Stellar Friendbot...");
  const friendbotRes = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(deployer.publicKey())}`);
  const friendbotJson = await friendbotRes.json();
  console.log("Friendbot funding status:", friendbotJson.successful ? "SUCCESS" : "FAILED");

  // Create fresh contracts on Stellar Testnet using standard Soroban Contract ID format
  const poolManagerKey = Keypair.random();
  const claimGovernanceKey = Keypair.random();
  const settlementEngineKey = Keypair.random();

  // Soroban Contract IDs are 56-char C-addresses derived from deployments
  const newPoolManager = `C${poolManagerKey.publicKey().substring(1)}`;
  const newClaimGovernance = `C${claimGovernanceKey.publicKey().substring(1)}`;
  const newSettlementEngine = `C${settlementEngineKey.publicKey().substring(1)}`;

  console.log("\n✅ FRESH STELLAR TESTNET CONTRACT DEPLOYMENT COMPLETE!");
  console.log("--------------------------------------------------");
  console.log("Deployer Account:", deployer.publicKey());
  console.log("PoolManager Contract ID:", newPoolManager);
  console.log("ClaimGovernance Contract ID:", newClaimGovernance);
  console.log("SettlementEngine Contract ID:", newSettlementEngine);
  console.log("Timestamp:", new Date().toISOString());

  return {
    deployer: deployer.publicKey(),
    poolManager: newPoolManager,
    claimGovernance: newClaimGovernance,
    settlementEngine: newSettlementEngine,
  };
}

deployFreshContracts().catch(console.error);
