DO $$
BEGIN
    IF NOT EXISTS (SELECT datname FROM pg_database) THEN
        CREATE DATABASE ethereum_monitor;
    END IF;
END $$;
