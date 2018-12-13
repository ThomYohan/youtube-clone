SELECT *
FROM video v
JOIN user_info u ON u.user_id = v.user_id
WHERE category = $1 and video_id != $2 AND view_count IS NOT NULL
ORDER BY view_count DESC
LIMIT 10;