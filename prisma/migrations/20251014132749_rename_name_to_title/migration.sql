-- This is an empty migration.
ALTER TABLE `notes` CHANGE COLUMN `name` `title` VARCHAR(255) NOT NULL;