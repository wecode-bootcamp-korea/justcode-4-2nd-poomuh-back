/*
  Warnings:

  - You are about to drop the column `address` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `trade_id` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the `user_real_estate_likes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address_main` to the `real_estates` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `real_estates` DROP FOREIGN KEY `real_estates_trade_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_real_estate_likes` DROP FOREIGN KEY `user_real_estate_likes_real_estate_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_real_estate_likes` DROP FOREIGN KEY `user_real_estate_likes_user_id_fkey`;

-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `address`,
    DROP COLUMN `trade_id`,
    ADD COLUMN `address_dong` VARCHAR(191) NULL,
    ADD COLUMN `address_ho` VARCHAR(191) NULL,
    ADD COLUMN `address_main` VARCHAR(191) NOT NULL,
    ADD COLUMN `prcie_deposit` DECIMAL(10, 0) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT,
    ALTER COLUMN `deleted_at` DROP DEFAULT,
    MODIFY `price_main` DECIMAL(10, 0) NULL;

-- DropTable
DROP TABLE `user_real_estate_likes`;

-- CreateTable
CREATE TABLE `trades_real_estates` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trade_id` INTEGER NOT NULL,
    `real_estate_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users_real_estates_likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `real_estate_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `trades_real_estates` ADD CONSTRAINT `trades_real_estates_real_estate_id_fkey` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `trades_real_estates` ADD CONSTRAINT `trades_real_estates_trade_id_fkey` FOREIGN KEY (`trade_id`) REFERENCES `trades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_real_estates_likes` ADD CONSTRAINT `users_real_estates_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_real_estates_likes` ADD CONSTRAINT `users_real_estates_likes_real_estate_id_fkey` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
