CREATE TABLE `likes` (
	`type` text NOT NULL,
	`resource_id` text NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	PRIMARY KEY(`type`, `resource_id`, `user_id`)
);
--> statement-breakpoint
ALTER TABLE `article` ADD `like_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `comment_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `view_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `is_banned` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `article` ADD `ban_reason` text;--> statement-breakpoint
ALTER TABLE `article` ADD `ban_by_user_id` text;--> statement-breakpoint
ALTER TABLE `user` ADD `is_banned` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `ban_reason` text;--> statement-breakpoint
ALTER TABLE `user` ADD `ban_by_user_id` text;