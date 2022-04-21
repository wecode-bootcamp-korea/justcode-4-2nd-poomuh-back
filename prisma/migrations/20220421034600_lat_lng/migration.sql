/*
  Warnings:

  - You are about to alter the column `latitude` on the `real_estates` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(18,15)`.
  - You are about to alter the column `longitude` on the `real_estates` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(18,15)`.

*/
-- AlterTable
ALTER TABLE `real_estates` MODIFY `latitude` DECIMAL(18, 15) NOT NULL,
    MODIFY `longitude` DECIMAL(18, 15) NOT NULL;
