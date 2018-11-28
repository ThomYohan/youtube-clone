SELECT *
FROM video
WHERE category = $1
ORDER BY view_count DESC
LIMIT 10;