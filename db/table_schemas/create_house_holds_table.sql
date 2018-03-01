CREATE TABLE IF NOT EXISTS house_holds (
    id SERIAL PRIMARY KEY,
    house_hold_name text,
    owner_id integer,
    address1 text,
    city text,
    address_state text,
    zipcode text
);