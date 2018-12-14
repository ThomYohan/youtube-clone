SELECT liked
FROM likes
WHERE user_id = $2 AND video_id = $1;