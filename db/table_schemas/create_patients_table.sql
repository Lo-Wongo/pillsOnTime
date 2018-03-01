CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    patient_name text,
    dob integer,
    gender text,
    patient_weight decimal,
    hh_id integer,
);