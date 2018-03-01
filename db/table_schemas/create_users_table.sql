CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email text,
    auth_id text,
    user_name text,
    img text,
    phone VARCHAR(20),
    hh_id integer
);