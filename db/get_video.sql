SELECT *
FROM video v
JOIN user_info u
ON u.user_id = v.user_id
WHERE video_id = $1;