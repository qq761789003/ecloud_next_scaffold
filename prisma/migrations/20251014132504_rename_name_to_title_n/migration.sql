/*
  Warnings:

  - Column `title` on table `notes` will be renamed to `name` to preserve data.

*/
-- AlterTable - Rename column to preserve data (MySQL compatible)
ALTER TABLE `notes` CHANGE COLUMN `title` `name` VARCHAR(255) NOT NULL;
