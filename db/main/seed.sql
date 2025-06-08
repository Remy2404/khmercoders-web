-- Seed file with fake data for development and testing
-- Contains only GitHub accounts as requested
-- Generated on June 8, 2025

-- User data (only users with GitHub accounts)
INSERT INTO `user` (`id`, `name`, `email`, `email_verified`, `image`, `created_at`, `updated_at`)
VALUES
  ('usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'Dara Sok', 'dara.sok@example.com', 1, 'https://randomuser.me/api/portraits/men/1.jpg', 1717247622, 1717247622),
  ('usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'Srey Pich', 'srey.pich@example.com', 1, 'https://randomuser.me/api/portraits/women/2.jpg', 1717247622, 1717247622),
  ('usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'Sokha Meas', 'sokha.meas@example.com', 1, 'https://randomuser.me/api/portraits/men/3.jpg', 1717247622, 1717247622),
  ('usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'Sophea Heng', 'sophea.heng@example.com', 1, 'https://randomuser.me/api/portraits/women/4.jpg', 1717247622, 1717247622),
  ('usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'Rithy Chhay', 'rithy.chhay@example.com', 1, 'https://randomuser.me/api/portraits/men/5.jpg', 1717247622, 1717247622),
  ('usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 'Admin User', 'admin@khmercoders.org', 1, 'https://randomuser.me/api/portraits/men/9.jpg', 1717247622, 1717247622);

-- Account data (GitHub accounts only)
INSERT INTO `account` (`id`, `account_id`, `provider_id`, `user_id`, `access_token`, `refresh_token`, `id_token`, `access_token_expires_at`, `refresh_token_expires_at`, `scope`, `password`, `created_at`, `updated_at`)
VALUES
  ('acc_01HQTG5BBRX3XY1JJVNN6CZ7ZH', '12345', 'github', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB', 'gho_fakeaccesstoken123456789', 'ghr_fakerefreshtoken123456789', NULL, 1717334022, 1719839222, 'read:user,user:email', NULL, 1717247622, 1717247622),
  ('acc_01HQTG5BBRX3XY1JJVNN6CZ7ZI', '23456', 'github', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC', 'gho_fakeaccesstoken234567890', 'ghr_fakerefreshtoken234567890', NULL, 1717334022, 1719839222, 'read:user,user:email', NULL, 1717247622, 1717247622),
  ('acc_01HQTG5BBRX3XY1JJVNN6CZ7ZJ', '34567', 'github', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD', 'gho_fakeaccesstoken345678901', 'ghr_fakerefreshtoken345678901', NULL, 1717334022, 1719839222, 'read:user,user:email', NULL, 1717247622, 1717247622),
  ('acc_01HQTG5BBRX3XY1JJVNN6CZ7ZK', '45678', 'github', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZE', 'gho_fakeaccesstoken456789012', 'ghr_fakerefreshtoken456789012', NULL, 1717334022, 1719839222, 'read:user,user:email', NULL, 1717247622, 1717247622),
  ('acc_01HQTG5BBRX3XY1JJVNN6CZ7ZL', '56789', 'github', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZF', 'gho_fakeaccesstoken567890123', 'ghr_fakerefreshtoken567890123', NULL, 1717334022, 1719839222, 'read:user,user:email', NULL, 1717247622, 1717247622),
  ('acc_01HQTG5BBRX3XY1JJVNN6CZ7ZM', '67890', 'github', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG', 'gho_fakeaccesstoken678901234', 'ghr_fakerefreshtoken678901234', NULL, 1717334022, 1719839222, 'read:user,user:email', NULL, 1717247622, 1717247622);

-- Active sessions for GitHub users (Tokens would be much longer in production)
INSERT INTO `session` (`id`, `expires_at`, `token`, `created_at`, `updated_at`, `ip_address`, `user_agent`, `user_id`)
VALUES
  ('ses_01HQTG5BBRX3XY1JJVNN6CZ7ZN', 1719839222, 'fake_session_token_12345', 1717247622, 1717247622, '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZB'),
  ('ses_01HQTG5BBRX3XY1JJVNN6CZ7ZO', 1719839222, 'fake_session_token_23456', 1717247622, 1717247622, '192.168.1.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZC'),
  ('ses_01HQTG5BBRX3XY1JJVNN6CZ7ZP', 1719839222, 'fake_session_token_34567', 1717247622, 1717247622, '192.168.1.3', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZD'),
  ('ses_01HQTG5BBRX3XY1JJVNN6CZ7ZQ', 1719839222, 'fake_session_token_45678', 1717247622, 1717247622, '192.168.1.4', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69', 'usr_01HQTG5BBRX3XY1JJVNN6CZ7ZG');