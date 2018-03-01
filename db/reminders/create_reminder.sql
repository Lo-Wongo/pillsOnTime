INSERT INTO reminders
(user_id, hour, medications)
VALUES ($1, $2, $3)
RETURNING *;