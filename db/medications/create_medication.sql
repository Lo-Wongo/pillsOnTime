INSERT INTO medications
( med_name, med_strength, patient_id)
VALUES
($1, $2, $3)
RETURNING *; 