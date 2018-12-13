UPDATE video
SET view_count = view_count + 1
WHERE video_id = $1
RETURNING view_count;