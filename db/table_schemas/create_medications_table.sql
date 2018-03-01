CREATE TABLE IF NOT EXISTS medications (
    id SERIAL PRIMARY KEY,
    med_name text,
    med_strength text,
    frequency1 real,
    frequency_type text,
    start_time varchar,
    amount text,
    notify_me boolean default false,
    patient_id integer
);