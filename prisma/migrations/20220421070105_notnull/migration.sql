/*
  Warnings:

  - Made the column `address_ho` on table `real_estates` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `real_estates` MODIFY `address_ho` VARCHAR(191) NOT NULL;
