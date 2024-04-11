/*
  Warnings:

  - You are about to drop the `temporarypassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `temporarypassword` DROP FOREIGN KEY `TemporaryPassword_verificationTokenId_fkey`;

-- DropTable
DROP TABLE `temporarypassword`;
