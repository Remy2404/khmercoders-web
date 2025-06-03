-- Dynamic seed file for DB_CHATBOT database
-- Uses SQLite date functions to generate data relative to current execution date

-- Users table seed data
INSERT OR IGNORE INTO "users" (platform, user_id, display_name, linked_user_id)
VALUES 
  ('telegram', '123456789', 'John Doe', NULL),
  ('discord', '987654321', 'Jane Smith', NULL),
  ('telegram', '234567890', 'Bob Johnson', NULL),
  ('discord', '876543210', 'Alice Brown', NULL),
  ('telegram', '345678901', 'Charlie Davis', 'user_123'),
  ('discord', '456789012', 'David Wilson', NULL),
  ('telegram', '567890123', 'Emma Garcia', NULL),
  ('discord', '678901234', 'Frank Miller', 'user_456'),
  ('telegram', '789012345', 'Grace Lee', NULL),
  ('discord', '890123456', 'Henry Taylor', NULL);

-- Generate 30 days of chat counter data using date functions
-- For each user, generate entries for the last 30 days with varying message counts

-- User 1: John Doe (telegram)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'telegram' as platform,
  '123456789' as user_id,
  (abs(random()) % 15) + 1 as message_count,  -- Random between 1-15
  ((abs(random()) % 50) + 5) * 10 as message_length  -- Random between 50-550
FROM days;

-- User 2: Jane Smith (discord)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'discord' as platform,
  '987654321' as user_id,
  (abs(random()) % 12) + 1 as message_count,  -- Random between 1-12
  ((abs(random()) % 40) + 10) * 10 as message_length  -- Random between 100-500
FROM days;

-- User 3: Bob Johnson (telegram)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'telegram' as platform,
  '234567890' as user_id,
  (abs(random()) % 20) + 1 as message_count,  -- Random between 1-20
  ((abs(random()) % 60) + 10) * 10 as message_length  -- Random between 100-700
FROM days;

-- User 4: Alice Brown (discord)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'discord' as platform,
  '876543210' as user_id,
  (abs(random()) % 18) + 1 as message_count,  -- Random between 1-18
  ((abs(random()) % 55) + 15) * 10 as message_length  -- Random between 150-700
FROM days;

-- User 5: Charlie Davis (telegram)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'telegram' as platform,
  '345678901' as user_id,
  (abs(random()) % 25) + 1 as message_count,  -- Random between 1-25
  ((abs(random()) % 80) + 20) * 10 as message_length  -- Random between 200-1000
FROM days
WHERE day_offset % 2 = 0;  -- This user only chats every other day

-- User 6: David Wilson (discord)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'discord' as platform,
  '456789012' as user_id,
  (abs(random()) % 10) + 1 as message_count,  -- Random between 1-10
  ((abs(random()) % 30) + 5) * 10 as message_length  -- Random between 50-350
FROM days
WHERE day_offset % 3 = 0;  -- This user only chats every third day

-- User 7: Emma Garcia (telegram)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'telegram' as platform,
  '567890123' as user_id,
  (abs(random()) % 30) + 1 as message_count,  -- Random between 1-30
  ((abs(random()) % 100) + 10) * 10 as message_length  -- Random between 100-1100
FROM days
WHERE day_offset <= 15;  -- This user only chats in the most recent 15 days

-- User 8: Frank Miller (discord)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'discord' as platform,
  '678901234' as user_id,
  (abs(random()) % 15) + 5 as message_count,  -- Random between 5-20
  ((abs(random()) % 50) + 20) * 10 as message_length  -- Random between 200-700
FROM days
WHERE day_offset >= 10;  -- This user only chats in the earlier 20 days

-- User 9: Grace Lee (telegram)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'telegram' as platform,
  '789012345' as user_id,
  (abs(random()) % 22) + 3 as message_count,  -- Random between 3-25
  ((abs(random()) % 70) + 15) * 10 as message_length  -- Random between 150-850
FROM days;

-- User 10: Henry Taylor (discord)
WITH RECURSIVE days(day_offset) AS (
  SELECT 0
  UNION ALL
  SELECT day_offset + 1 FROM days WHERE day_offset < 29
)
INSERT OR IGNORE INTO "chat_counter" (chat_date, platform, user_id, message_count, message_length)
SELECT 
  date('now', '-' || day_offset || ' days') as chat_date,
  'discord' as platform,
  '890123456' as user_id,
  (abs(random()) % 18) + 2 as message_count,  -- Random between 2-20
  ((abs(random()) % 60) + 10) * 10 as message_length  -- Random between 100-700
FROM days;
