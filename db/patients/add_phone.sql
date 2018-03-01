UPDATE users set phone = $1
where id = $2
RETURNING *; 