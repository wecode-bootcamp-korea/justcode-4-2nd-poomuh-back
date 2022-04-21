/*
  Warnings:

  - You are about to drop the column `address` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `trade_id` on the `real_estates` table. All the data in the column will be lost.
  - Added the required column `address_ho` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_main` to the `real_estates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `real_estates` DROP FOREIGN KEY `real_estates_trade_id_fkey`;

-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `address`,
    DROP COLUMN `trade_id`,
    ADD COLUMN `address_dong` VARCHAR(191) NULL,
    ADD COLUMN `address_ho` VARCHAR(191) NOT NULL,
    ADD COLUMN `address_main` VARCHAR(191) NOT NULL,
    ADD COLUMN `price_deposit` DECIMAL(10, 0) NULL,
    MODIFY `price_main` DECIMAL(10, 0) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `nickname` VARCHAR(191) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `trades_real_estates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trade_id` INTEGER NOT NULL,
    `real_estate_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trades_real_estates` ADD CONSTRAINT `trades_real_estates_real_estate_id_fkey` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trades_real_estates` ADD CONSTRAINT `trades_real_estates_trade_id_fkey` FOREIGN KEY (`trade_id`) REFERENCES `trades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
