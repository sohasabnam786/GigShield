use soroban_sdk::{contracttype, Address, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    Token,
    PoolBalance(String), // profession: "delivery", "domestic", "freelance"
    Worker(Address),
    TotalWorkers,
    DailyRate(String), // micro-contribution rate in USDC stroops
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct WorkerProfile {
    pub worker: Address,
    pub profession: String, // e.g. "delivery"
    pub region: String,     // e.g. "India-UPI"
    pub active: bool,
    pub joined_at: u64,
    pub total_contributed: i128,
}
