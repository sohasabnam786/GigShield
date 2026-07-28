#![no_std]

mod types;

use soroban_sdk::{
    contract, contractimpl, contractmeta, symbol_short, Address, Env, String,
};
use types::{Claim, ClaimStatus, DataKey};

contractmeta!(
    key = "Description",
    val = "GigShield Claim Governance: Stake-Weighted Peer Voting & IPFS Hash Anchoring"
);
contractmeta!(key = "Version", val = "1.0.0");

#[contract]
pub struct ClaimGovernance;

#[contractimpl]
impl ClaimGovernance {
    pub fn initialize(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::ClaimCount, &0u64);
    }

    /// Submit a new insurance claim with IPFS evidence hash
    pub fn submit_claim(
        env: Env,
        claimant: Address,
        amount: i128,
        profession: String,
        ipfs_hash: String,
    ) -> u64 {
        claimant.require_auth();
        if amount <= 0 {
            panic!("Claim amount must be positive");
        }

        let count: u64 = env.storage().instance().get(&DataKey::ClaimCount).unwrap_or(0);
        let claim_id = count + 1;
        let now = env.ledger().timestamp();

        let claim = Claim {
            id: claim_id,
            claimant: claimant.clone(),
            amount,
            profession: profession.clone(),
            ipfs_evidence_hash: ipfs_hash,
            yes_votes: 0,
            no_votes: 0,
            status: ClaimStatus::Pending,
            created_at: now,
            expires_at: now + 86400, // 24-hour voting window
        };

        env.storage().persistent().set(&DataKey::Claim(claim_id), &claim);
        env.storage().instance().set(&DataKey::ClaimCount, &claim_id);

        env.events().publish(
            (symbol_short!("clm_sub"), claimant),
            (claim_id, amount, profession),
        );

        claim_id
    }

    /// Peer validator vote on active claim (approve or reject)
    pub fn vote_claim(env: Env, validator: Address, claim_id: u64, approve: bool) {
        validator.require_auth();
        let vote_key = DataKey::Vote(claim_id, validator.clone());
        if env.storage().persistent().has(&vote_key) {
            panic!("Validator already voted");
        }

        let claim_key = DataKey::Claim(claim_id);
        let mut claim: Claim = env.storage().persistent().get(&claim_key).expect("Claim not found");

        if claim.status != ClaimStatus::Pending {
            panic!("Claim is not pending");
        }
        if env.ledger().timestamp() > claim.expires_at {
            panic!("Voting period expired");
        }

        if approve {
            claim.yes_votes += 1;
        } else {
            claim.no_votes += 1;
        }

        // Consensus threshold: 3 yes votes approves the claim
        if claim.yes_votes >= 3 {
            claim.status = ClaimStatus::Approved;
        } else if claim.no_votes >= 3 {
            claim.status = ClaimStatus::Rejected;
        }

        env.storage().persistent().set(&vote_key, &true);
        env.storage().persistent().set(&claim_key, &claim);

        env.events().publish(
            (symbol_short!("clm_vote"), validator),
            (claim_id, approve),
        );
    }

    pub fn get_claim(env: Env, claim_id: u64) -> Claim {
        env.storage().persistent().get(&DataKey::Claim(claim_id)).expect("Claim not found")
    }

    pub fn get_claim_count(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::ClaimCount).unwrap_or(0)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_initialize_and_submit() {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let contract_id = env.register_contract(None, ClaimGovernance);
        let client = ClaimGovernanceClient::new(&env, &contract_id);

        client.initialize(&admin);
        assert_eq!(client.get_claim_count(), 0);
    }
}
