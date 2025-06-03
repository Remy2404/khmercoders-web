-- Schema for DB_CHATBOT database (kcc-chatbot)

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
  platform TEXT NOT NULL,
  user_id TEXT NOT NULL,         
  display_name TEXT NOT NULL,
  linked_user_id TEXT,
  PRIMARY KEY (platform, user_id)
);

-- Chat counter table
CREATE TABLE IF NOT EXISTS "chat_counter" (
  chat_date TEXT NOT NULL,
  platform TEXT NOT NULL,
  user_id TEXT NOT NULL,         
  message_count INTEGER NOT NULL DEFAULT 0,
  message_length INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (chat_date, platform, user_id)
);
