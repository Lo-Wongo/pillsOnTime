insert into house_holds
(house_hold_name, owner_id)
values ($1, $2)
returning *;