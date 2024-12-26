create database grid_be_db;

CREATE ROLE addlatt WITH LOGIN PASSWORD 'Reacher01_';

GRANT ALL PRIVILEGES ON DATABASE grid_be_db TO addlatt; 

--psql -U addlatt -d grid_be_db -h localhost -p 5432

CREATE SCHEMA test AUTHORIZATION addlatt;

GRANT ALL ON SCHEMA test TO addlatt;




-- Purpose: To store details of all registered users.
CREATE TABLE test.users (
    user_id SERIAL PRIMARY KEY,            -- Unique identifier for each user
    username VARCHAR(50) NOT NULL UNIQUE,  -- Unique username for login
    email VARCHAR(100) NOT NULL UNIQUE,    -- User's email address
    password_hash TEXT NOT NULL,           -- Hashed password for secure authentication
    created_at TIMESTAMP DEFAULT NOW(),    -- Timestamp when the user was created
    updated_at TIMESTAMP DEFAULT NOW()     -- Timestamp of the last update
);

-- Table: roles
-- Purpose: To define and manage user roles.
CREATE TABLE test.roles (
    role_id SERIAL PRIMARY KEY,            -- Unique identifier for each role
    role_name VARCHAR(50) NOT NULL UNIQUE, -- Name of the role (e.g., Admin, User)
    description TEXT                       -- Description of the role's purpose
);

-- Table: user_roles
-- Purpose: To associate users with specific roles.
CREATE TABLE test.user_roles (
    user_id INT REFERENCES test.users(user_id) ON DELETE CASCADE, -- User ID
    role_id INT REFERENCES test.roles(role_id) ON DELETE CASCADE, -- Role ID
    assigned_at TIMESTAMP DEFAULT NOW(),                          -- Timestamp when the role was assigned
    PRIMARY KEY (user_id, role_id)                                -- Composite primary key
);

-- Table: audit_logs
-- Purpose: To record changes or actions within the application.
CREATE TABLE test.audit_logs (
    log_id SERIAL PRIMARY KEY,                -- Unique identifier for each log entry
    user_id INT REFERENCES test.users(user_id) ON DELETE SET NULL, -- ID of the user who performed the action
    action VARCHAR(200) NOT NULL,             -- Description of the action
    created_at TIMESTAMP DEFAULT NOW()        -- Timestamp of the action
);


----------------------------------------------------------------------------
-- Insert dummy users
INSERT INTO test.users (username, email, password_hash)
VALUES
('addlatt', 'addlatt@gmail.com', 'hashed_password_123'),
('jane_smith', 'jane.smith@example.com', 'hashed_password_456'),
('alice_wonder', 'alice.wonder@example.com', 'hashed_password_789'),
('bob_builder', 'bob.builder@example.com', 'hashed_password_012');


-- Insert dummy roles
INSERT INTO test.roles (role_name, description)
VALUES
('Admin', 'Administrator with full access'),
('Editor', 'Can edit content'),
('Viewer', 'Can view content'),
('Contributor', 'Can contribute new content');


-- Assign roles to users
INSERT INTO test.user_roles (user_id, role_id, assigned_at)
VALUES
(1, 1, NOW()),  -- addlatt is an Admin
(2, 2, NOW()),  -- Jane Smith is an Editor
(3, 3, NOW()),  -- Alice Wonder is a Viewer
(4, 4, NOW());  -- Bob Builder is a Contributor