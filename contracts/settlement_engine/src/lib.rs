#![no_std]

mod types;

use soroban_sdk::{
    contract, contractimpl, contractmeta, symbol_short, token, Address, Env,
};
use types::DataKey;

contractmeta!(
    key = "Description",
    val = "GigShield Settlement Engine: Automated USDC Claim Payout Release"
);
contractmeta!(key = "Version", val = "1.0.0");

#[contract]
pub struct SettlementEngine;

#[contractimpl]
impl SettlementEngine {
    pub fn initialize(env: Env, admin: Address, token: Address, pool_mgr: Address, gov: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::PoolManager, &pool_mgr);
        env.storage().instance().set(&DataKey::Governance, &gov);
        env.storage().instance().set(&DataKey::SettlementCount, &0u64);
    }

    /// Trigger payout release for approved claim
    pub fn execute_settlement(env: Env, caller: Address, recipient: Address, claim_id: u64, amount: i128) {
        caller.require_auth();
        if amount <= 0 {
            panic!("Invalid payout amount");
        }

        let token_addr: Address = env.storage().instance().get(&DataKey::Token).expect("Token not configured");
        let token_client = token::Client::new(&env, &token_addr);

        // Transfer funds directly from settlement contract to recipient
        token_client.transfer(&env.current_contract_address(), &recipient, &amount);

        let count: u64 = env.storage().instance().get(&DataKey::SettlementCount).unwrap_or(0);
        env.storage().instance().set(&DataKey::SettlementCount, &(count + 1));

        env.events().publish(
            (symbol_short!("settled"), recipient),
            (claim_id, amount),
        );
    }

    pub fn get_total_settlements(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::SettlementCount).unwrap_or(0)
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        env.mock_all_auths();

        let admin = Address::generate(&env);
        let token = Address::generate(&env);
        let pool = Address::generate(&env);
        let gov = Address::generate(&env);
        let contract_id = env.register_contract(None, SettlementEngine);
        let client = SettlementEngineClient::new(&env, &contract_id);

        client.initialize(&admin, &token, &pool, &gov);
        assert_eq!(client.get_total_settlements(), 0);
    }
}
