-- This is an empty migration.
ALTER TABLE `notes` DROP COLUMN `name`,
    ADD COLUMN `title` VARCHAR(255) NOT NULL;