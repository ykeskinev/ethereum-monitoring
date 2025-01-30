DROP TABLE IF EXISTS rule CASCADE;
-- A template for creating new tables with ID UUID
CREATE TABLE rule(
    id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);