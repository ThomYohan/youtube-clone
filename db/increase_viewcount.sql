UPDATE video
SET view_count = $2
WHERE video_id = $1;