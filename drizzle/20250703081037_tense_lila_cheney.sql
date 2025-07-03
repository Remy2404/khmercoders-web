PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_article` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`slug` text DEFAULT '' NOT NULL,
	`image` text,
	`summary` text,
	`content` text NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`approved_by_ai` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_article`("id", "user_id", "title", "slug", "image", "summary", "content", "published", "approved_by_ai", "created_at", "updated_at") SELECT "id", "user_id", "title", "slug", "image", "summary", "content", "published", "approved_by_ai", "created_at", "updated_at" FROM `article`;--> statement-breakpoint
DROP TABLE `article`;--> statement-breakpoint
ALTER TABLE `__new_article` RENAME TO `article`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `article_user_id_idx` ON `article` (`user_id`);