UPDATE likes
SET liked = $3
WHERE video_id = $1 AND user_id = $2;