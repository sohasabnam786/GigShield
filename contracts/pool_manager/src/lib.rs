#![no_std]

mod types;

use soroban_sdk::{
    contract, contractimpl, contractmeta, symbol_short, token, Address, Env, String,
};
use types::{DataKey, WorkerProfile};

contractmeta!(
    key = "Description",
    val = "GigShield Pool Manager: Micro-contributions & Community Reserve Pools"
);
contractmeta!(key = "Version", val = "1.0.0");

#[contract]
pub struct PoolManager;

#[contractimpl]
impl PoolManager {
    /// Initialize admin and underlying asset token (USDC)
    pub fn initialize(env: Env, admin: Address, token: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::TotalWorkers, &0u64);
    }

    /// Register a gig worker for insurance pool
    pub fn register_worker(env: Env, worker: Address, profession: String, region: String) {
        worker.require_auth();
        let key = DataKey::Worker(worker.clone());
        if env.storage().persistent().has(&key) {
            panic!("Worker already registered");
        }

        let profile = WorkerProfile {
            worker: worker.clone(),
            profession: profession.clone(),
            region,
            active: true,
            joined_at: env.ledger().timestamp(),
            total_contributed: 0,
        };

        env.storage().persistent().set(&key, &profile);
        let total: u64 = env.storage().instance().get(&DataKey::TotalWorkers).unwrap_or(0);
        env.storage().instance().set(&DataKey::TotalWorkers, &(total + 1));

        env.events().publish(
            (symbol_short!("reg_work"), worker),
            profession,
        );
    }

    /// Deposit daily micro-contribution ($0.10 USDC = 1,000,000 stroops)
    pub fn deposit_contribution(env: Env, worker: Address, amount: i128) {
        worker.require_auth();
        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let worker_key = DataKey::Worker(worker.clone());
        let mut profile: WorkerProfile = env.storage().persistent().get(&worker_key).expect("Worker not registered");

        let token_addr: Address = env.storage().instance().get(&DataKey::Token).expect("Token not set");
        let token_client = token::Client::new(&env, &token_addr);

        // Transfer contribution to pool manager contract escrow
        token_client.transfer(&worker, &env.current_contract_address(), &amount);

        profile.total_contributed += amount;
        env.storage().persistent().set(&worker_key, &profile);

        // Update pool balance for worker profession
        let pool_key = DataKey::PoolBalance(profile.profession.clone());
        let current_balance: i128 = env.storage().instance().get(&pool_key).unwrap_or(0);
        env.storage().instance().set(&pool_key, &(current_balance + amount));

        env.events().publish(
            (symbol_short!("contrib"), worker),
            (profile.profession, amount),
        );
    }

    pub fn get_pool_balance(env: Env, profession: String) -> i128 {
        env.storage().instance().get(&DataKey::PoolBalance(profession)).unwrap_or(0)
    }

    pub fn get_worker(env: Env, worker: Address) -> WorkerProfile {
        env.storage().persistent().get(&DataKey::Worker(worker)).expect("Worker not found")
    }

    pub fn get_total_workers(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::TotalWorkers).unwrap_or(0)
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
        let contract_id = env.register_contract(None, PoolManager);
        let client = PoolManagerClient::new(&env, &contract_id);

        client.initialize(&admin, &token);
        assert_eq!(client.get_total_workers(), 0);
    }
}
