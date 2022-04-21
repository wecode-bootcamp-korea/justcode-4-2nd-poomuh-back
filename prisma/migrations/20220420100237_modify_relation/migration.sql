/*
  Warnings:

  - You are about to drop the column `real_estate_id` on the `real_estate_agents` table. All the data in the column will be lost.
  - You are about to drop the column `address_dong` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `address_ho` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `address_main` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `price_deposit` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the `trades_real_estates` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `real_estate_agent_id` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trade_id` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Made the column `price_main` on table `real_estates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nickname` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `real_estate_agents` DROP FOREIGN KEY `real_estate_agents_real_estate_id_fkey`;

-- DropForeignKey
ALTER TABLE `trades_real_estates` DROP FOREIGN KEY `trades_real_estates_real_estate_id_fkey`;

-- DropForeignKey
ALTER TABLE `trades_real_estates` DROP FOREIGN KEY `trades_real_estates_trade_id_fkey`;

-- AlterTable
ALTER TABLE `real_estate_agents` DROP COLUMN `real_estate_id`;

-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `address_dong`,
    DROP COLUMN `address_ho`,
    DROP COLUMN `address_main`,
    DROP COLUMN `price_deposit`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `real_estate_agent_id` INTEGER NOT NULL,
    ADD COLUMN `trade_id` INTEGER NOT NULL,
    MODIFY `price_main` DECIMAL(10, 0) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `nickname` VARCHAR(191) NOT NULL,
    MODIFY `phone_number` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `trades_real_estates`;

-- AddForeignKey
ALTER TABLE `real_estates` ADD CONSTRAINT `real_estates_real_estate_agent_id_fkey` FOREIGN KEY (`real_estate_agent_id`) REFERENCES `real_estate_agents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `real_estates` ADD CONSTRAINT `real_estates_trade_id_fkey` FOREIGN KEY (`trade_id`) REFERENCES `trades`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
