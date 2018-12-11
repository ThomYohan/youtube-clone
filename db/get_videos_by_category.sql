SELECT *
FROM video
WHERE category = $1 and video_id != $2
ORDER BY view_count DESC
LIMIT 10; 