SELECT COUNT (liked)
FROM likes
WHERE video_id = $1 AND liked = true;