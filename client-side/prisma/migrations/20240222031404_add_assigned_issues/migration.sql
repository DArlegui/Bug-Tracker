/*
  Warnings:

  - You are about to drop the `app_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `issues` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` BLOB NULL;

-- DropTable
DROP TABLE `app_users`;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
