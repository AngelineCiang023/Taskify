-- AlterTable
ALTER TABLE `task` ADD COLUMN `category` VARCHAR(191) NULL,
    ADD COLUMN `dueDate` DATETIME(3) NULL,
    ADD COLUMN `priority` VARCHAR(191) NOT NULL DEFAULT 'medium';
