/*
  Warnings:

  - Made the column `address_dong` on table `real_estates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `real_estates` MODIFY `address_dong` VARCHAR(191) NOT NULL;
