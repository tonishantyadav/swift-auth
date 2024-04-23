-- AlterTable
ALTER TABLE `user` ADD COLUMN `oTPId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `OTP` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `OTP_email_key`(`email`),
    UNIQUE INDEX `OTP_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_oTPId_fkey` FOREIGN KEY (`oTPId`) REFERENCES `OTP`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
