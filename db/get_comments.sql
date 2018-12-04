select
   u.first_name,
   u.last_name,
   u.user_img,
   c.comment_id,
   c.comment
from comment c
JOIN user_info u
ON u.user_id = c.user_id
where video_id = $1