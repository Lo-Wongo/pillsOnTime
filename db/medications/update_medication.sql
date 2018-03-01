UPDATE medications
SET med_name = $2,
SET med_strength = $3,
SET frequency = $4,
SET start_time = $5,
SET amount = $6,
WHERE id = $1;