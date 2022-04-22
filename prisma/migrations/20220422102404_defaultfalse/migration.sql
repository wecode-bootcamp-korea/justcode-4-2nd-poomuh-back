/*
  Warnings:

  - You are about to alter the column `supply_size` on the `real_estates` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(5,2)`.
  - You are about to alter the column `exclusive_size` on the `real_estates` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE `real_estates` MODIFY `supply_size` DECIMAL(5, 2) NOT NULL,
    MODIFY `exclusive_size` DECIMAL(5, 2) NOT NULL,
    MODIFY `is_deleted` BOOLEAN NOT NULL DEFAULT false;
