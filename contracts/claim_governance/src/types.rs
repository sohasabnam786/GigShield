use soroban_sdk::{contracttype, Address, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    Claim(u64),
    ClaimCount,
    Vote(u64, Address), // (claim_id, validator)
    Reputation(Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ClaimStatus {
    Pending,
    Approved,
    Rejected,
    Settled,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Claim {
    pub id: u64,
    pub claimant: Address,
    pub amount: i128,
    pub profession: String,
    pub ipfs_evidence_hash: String,
    pub yes_votes: u32,
    pub no_votes: u32,
    pub status: ClaimStatus,
    pub created_at: u64,
    pub expires_at: u64,
}
