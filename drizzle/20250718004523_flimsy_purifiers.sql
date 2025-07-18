CREATE TABLE `followers` (
	`user_id` text,
	`follower_id` text,
	`created_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `follower_id`)
);
--> statement-breakpoint
CREATE INDEX `followers_follower_id_idx` ON `followers` (`follower_id`);--> statement-breakpoint
ALTER TABLE `user` ADD `followers_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `following_count` integer DEFAULT 0 NOT NULL;