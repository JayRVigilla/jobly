CREATE TABLE companies
(
    handle TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    num_employees INTEGER,
    description TEXT,
    logo_url TEXT
);

CREATE TABLE jobs
(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    salary INTEGER NOT NULL,
    equity FLOAT NOT NULL,
    company_handle TEXT REFERENCES companies (handle) ON DELETE CASCADE,
    date_posted DATE,
    CHECK (equity<1)
);


CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    photo_url TEXT,
    is_admin BOOLEAN NOT NULL default FALSE
);