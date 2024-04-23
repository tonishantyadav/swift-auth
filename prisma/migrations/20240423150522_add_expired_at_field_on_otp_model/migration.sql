/*
  Warnings:

  - Added the required column `expiredAt` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` ADD COLUMN `expiredAt` DATETIME(3) NOT NULL;
