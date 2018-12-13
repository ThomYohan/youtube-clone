SELECT *
FROM video
WHERE user_id = $1
ORDER BY video_id DESC;