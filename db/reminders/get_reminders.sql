SELECT med_name, med_strength, phone, user_name, hour, patient_name from reminders as r
join users as u on r.user_id = u.id
join medications as m on r.medications = m.id
join patients as p on m.patient_id = p.id
where hour = $1;