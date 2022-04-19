/*
  Warnings:

  - You are about to drop the column `updated_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `heats` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `real_estate_agents` table. All the data in the column will be lost.
  - You are about to drop the column `real_estates_id` on the `real_estate_agents` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `real_estate_agents` table. All the data in the column will be lost.
  - You are about to drop the column `categories_id` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `heats_id` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `trades_type_id` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `trades` table. All the data in the column will be lost.
  - You are about to drop the column `real_estates_id` on the `user_real_estate_likes` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `real_estate_id` to the `real_estate_agents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heat_id` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_main` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trade_id` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `real_estate_id` to the `user_real_estate_likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `real_estate_agents` DROP FOREIGN KEY `real_estate_agents_real_estates_id_fkey`;

-- DropForeignKey
ALTER TABLE `real_estates` DROP FOREIGN KEY `real_estates_categories_id_fkey`;

-- DropForeignKey
ALTER TABLE `real_estates` DROP FOREIGN KEY `real_estates_heats_id_fkey`;

-- DropForeignKey
ALTER TABLE `real_estates` DROP FOREIGN KEY `real_estates_trades_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_real_estate_likes` DROP FOREIGN KEY `user_real_estate_likes_real_estates_id_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `heats` DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `real_estate_agents` DROP COLUMN `deleted_at`,
    DROP COLUMN `real_estates_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `real_estate_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `categories_id`,
    DROP COLUMN `heats_id`,
    DROP COLUMN `trades_type_id`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `heat_id` INTEGER NOT NULL,
    ADD COLUMN `price_main` DECIMAL(10, 0) NOT NULL,
    ADD COLUMN `price_monthly` DECIMAL(10, 0) NULL,
    ADD COLUMN `trade_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `trades` DROP COLUMN `updated_at`;

-- AlterTable
ALTER TABLE `user_real_estate_likes` DROP COLUMN `real_estates_id`,
    ADD COLUMN `real_estate_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `deleted_at`,
    DROP COLUMN `updated_at`;

-- AddForeignKey
ALTER TABLE `real_estate_agents` ADD CONSTRAINT `real_estate_agents_real_estate_id_fkey` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `real_estates` ADD CONSTRAINT `real_estates_heat_id_fkey` FOREIGN KEY (`heat_id`) REFERENCES `heats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `real_estates` ADD CONSTRAINT `real_estates_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `real_estates` ADD CONSTRAINT `real_estates_trade_id_fkey` FOREIGN KEY (`trade_id`) REFERENCES `trades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_real_estate_likes` ADD CONSTRAINT `user_real_estate_likes_real_estate_id_fkey` FOREIGN KEY (`real_estate_id`) REFERENCES `real_estates`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
