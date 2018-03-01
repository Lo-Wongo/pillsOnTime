INSERT INTO medications
(frequency1, frequency_type, start_time, amount )
VALUES
($1, $2, $3, $4)
RETURNING *; 
