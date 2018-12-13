SELECT *
FROM video v
JOIN user_info u ON u.user_id = v.user_id
WHERE category = $1 and video_id != $2
ORDER BY view_count DESC
LIMIT 10; 