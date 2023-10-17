CREATE TABLE `itineraries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`from_city` text NOT NULL,
	`to_city` text NOT NULL,
	`from_date` integer NOT NULL,
	`to_date` integer NOT NULL,
	`transportation` text NOT NULL,
	`hotel` text NOT NULL
);
