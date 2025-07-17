CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`content` text NOT NULL,
	`like_count` integer DEFAULT 0 NOT NULL,
	`comment_count` integer DEFAULT 0 NOT NULL,
	`resource_type` text NOT NULL,
	`resource_id` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `posts_user_id_idx` ON `posts` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `posts_resource_type_idx` ON `posts` (`resource_type`,`resource_id`);