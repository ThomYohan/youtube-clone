SELECT *
FROM video v
JOIN user_info u ON u.user_id = v.user_id
WHERE view_count IS NOT NULL
ORDER BY view_count DESC
LIMIT 10;