CREATE TABLE `items` (
	`id` text DEFAULT (UUID()),
	`created` text DEFAULT (CURRENT_TIMESTAMP),
	`name` text,
	`description` text
);
