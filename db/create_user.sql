INSERT INTO user_info ( first_name, last_name, auth_id, user_img, email)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;