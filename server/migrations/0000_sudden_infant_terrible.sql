CREATE TABLE `categories_items` (
	`id` text PRIMARY KEY DEFAULT (UUID()) NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`category` text NOT NULL,
	`item` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	`worn_weight` integer DEFAULT false NOT NULL,
	`cons_weight` integer DEFAULT false NOT NULL,
	`packed` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item`) REFERENCES `items`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY DEFAULT (UUID()) NOT NULL,
	`list` text NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`list`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `items` (
	`id` text PRIMARY KEY DEFAULT (UUID()) NOT NULL,
	`user` text NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text,
	`description` text,
	`weight` real DEFAULT 0 NOT NULL,
	`weight_unit` text DEFAULT 'g' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` text PRIMARY KEY DEFAULT (UUID()) NOT NULL,
	`user` text NOT NULL,
	`created` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`name` text,
	`description` text,
	`show_images` integer DEFAULT false NOT NULL,
	`show_prices` integer DEFAULT false NOT NULL,
	`show_packed` integer DEFAULT false NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`weight_unit` text DEFAULT 'g' NOT NULL
);
