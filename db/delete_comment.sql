DELETE
FROM comment
WHERE comment_id = $1 AND user_id = $2;

select
   u.first_name,
   u.last_name,
   u.channel_name,
   u.user_img,
   u.user_id,
   c.comment_id,
   c.comment
from comment c
JOIN user_info u
ON u.user_id = c.user_id
where video_id = $3