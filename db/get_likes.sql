SELECT *
FROM likes
WHERE video_id =$1 AND user_id = $2;