INSERT into reminders
(user_id, hour, medications)
values
($1, $2, $3)
returning *;