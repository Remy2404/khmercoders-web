CREATE TABLE `article_review_log` (
	`id` text PRIMARY KEY NOT NULL,
	`article_id` text NOT NULL,
	`reviewer_id` text NOT NULL,
	`status` text NOT NULL,
	`feedback` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `article_review_log_article_id_idx` ON `article_review_log` (`article_id`);--> statement-breakpoint
ALTER TABLE `article` ADD `review_status` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `review_by` text;--> statement-breakpoint
ALTER TABLE `article` DROP COLUMN `is_banned`;--> statement-breakpoint
ALTER TABLE `article` DROP COLUMN `ban_reason`;--> statement-breakpoint
ALTER TABLE `article` DROP COLUMN `ban_by_user_id`;