DROP TABLE IF EXISTS ethereum_block CASCADE;

CREATE TABLE ethereum_block (
    id SERIAL PRIMARY KEY,            
    number BIGINT UNIQUE NOT NULL, 
    hash TEXT UNIQUE NOT NULL,  
    parent_hash TEXT NOT NULL,      
    miner TEXT NOT NULL,             
    difficulty NUMERIC(78,0) NOT NULL, 
    gas_limit BIGINT NOT NULL,       
    gas_used BIGINT NOT NULL,    
    transaction_count INT NOT NULL DEFAULT 0,
    timestamp BIGINT NOT NULL,
    extra_data TEXT,
    size BIGINT NOT NULL,
    state_root TEXT NOT NULL,
    receipts_root TEXT NOT NULL,
    transactions_root TEXT NOT NULL
);
