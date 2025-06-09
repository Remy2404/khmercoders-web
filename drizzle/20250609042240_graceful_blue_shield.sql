CREATE TABLE `member_profile` (
	`user_id` text PRIMARY KEY NOT NULL,
	`alias` text NOT NULL,
	`alias_updated_at` integer,
	`picture` text,
	`title` text,
	`bio` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `member_profile_alias_unique` ON `member_profile` (`alias`);--> statement-breakpoint
CREATE TABLE `work_experience` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`start_year` integer NOT NULL,
	`end_year` integer,
	`company_name` text NOT NULL,
	`company_logo` text,
	`company_id` text,
	`role` text NOT NULL,
	`description` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `work_experience_user_id_idx` ON `work_experience` (`user_id`);
