/*
  Warnings:

  - You are about to drop the column `twoStepVerificationTokenId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_twoStepVerificationTokenId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `twoStepVerificationTokenId`,
    ADD COLUMN `twoStepTokenId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_twoStepTokenId_fkey` FOREIGN KEY (`twoStepTokenId`) REFERENCES `TwoStepToken`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
