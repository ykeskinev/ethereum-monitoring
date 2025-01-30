-- Create the 'admin' role with superuser privileges (can manage everything)
SET myapp.pguser_password TO :pgpassword;
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin') THEN
        EXECUTE format('CREATE ROLE admin WITH LOGIN PASSWORD %L', current_setting('myapp.pguser_password'));
    END IF;
    IF NOT EXISTS (SELECT datname FROM pg_database) THEN
        CREATE DATABASE ethereum_monitor;
    END IF;
END $$;



-- Step 3: Grant roles and privileges on the database
-- Grant 'admin' role full access to the database
GRANT ALL PRIVILEGES ON DATABASE ethereum_monitor TO admin;
