/*
  Warnings:

  - Added the required column `building_name` to the `real_estates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `real_estates` ADD COLUMN `building_name` VARCHAR(191) NOT NULL;
