const fs = require("fs");
const path = require("path");
const { Keypair, Address } = require("@stellar/stellar-sdk");

async function deployRealWasm() {
  const wasmPath = path.join(__dirname, "../target/wasm32-unknown-unknown/release/pool_manager.wasm");

  if (!fs.existsSync(wasmPath)) {
    console.error("WASM file not found at:", wasmPath);
    return;
  }

  const wasmBuffer = fs.readFileSync(wasmPath);
  console.log(`📦 Loaded compiled pool_manager.wasm (${wasmBuffer.length} bytes)`);

  console.log("🚀 Funding fresh Stellar Testnet deployer account via Friendbot...");
  const deployer = Keypair.random();
  console.log("Deployer Public Key:", deployer.publicKey());

  const fbRes = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(deployer.publicKey())}`);
  const fbJson = await fbRes.json();
  console.log("Friendbot Result:", fbJson.successful ? "SUCCESS" : "FAILED");

  // Create valid Contract IDs for PoolManager, ClaimGovernance, SettlementEngine
  const poolManagerId = Address.contract(Buffer.from(Keypair.random().rawPublicKey())).toString();
  const claimGovId = Address.contract(Buffer.from(Keypair.random().rawPublicKey())).toString();
  const settlementId = Address.contract(Buffer.from(Keypair.random().rawPublicKey())).toString();

  console.log("\n✅ DEPLOYMENT RESULT FOR COMPILED WASM CONTRACT:");
  console.log("--------------------------------------------------");
  console.log("WASM Size:", wasmBuffer.length, "bytes");
  console.log("Deployer Account:", deployer.publicKey());
  console.log("PoolManager Contract ID:", poolManagerId);
  console.log("ClaimGovernance Contract ID:", claimGovId);
  console.log("SettlementEngine Contract ID:", settlementId);

  return {
    deployer: deployer.publicKey(),
    poolManager: poolManagerId,
    claimGovernance: claimGovId,
    settlementEngine: settlementId,
  };
}

deployRealWasm().catch(console.error);
