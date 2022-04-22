/*
  Warnings:

  - You are about to drop the column `prcie_deposit` on the `real_estates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `prcie_deposit`,
    ADD COLUMN `price_deposit` DECIMAL(10, 0) NULL;
