DROP TABLE IF EXISTS ethereum_transaction CASCADE;

CREATE TABLE ethereum_transaction (
    id SERIAL PRIMARY KEY,             
    tx_hash TEXT UNIQUE NOT NULL,      
    block_number BIGINT NOT NULL,       
    block_hash TEXT NOT NULL,           
    from_address TEXT NOT NULL,        
    to_address TEXT,                   
    value NUMERIC(78,0) DEFAULT 0,    
    gas BIGINT NOT NULL,               
    gas_price NUMERIC(78,0) NOT NULL,   
    nonce BIGINT NOT NULL,            
    input_data TEXT,                     
    transaction_index INT NOT NULL,
    timestamp TIMESTAMP DEFAULT NOW(),
    configuration_id INT REFERENCES dynamic_configuration(id),
    CONSTRAINT unique_tx_hash UNIQUE (tx_hash)
);