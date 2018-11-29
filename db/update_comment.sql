UPDATE comment
SET comment = $3
WHERE comment_id = $1 AND user_id = $2;