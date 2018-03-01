INSERT INTO patients
(patient_name, dob, street, city, state, zipcode, allegies, hh_id )
VALUES
($1, $2, $3, $4, $5, $6, $7, $8)
RETURNING *; 
