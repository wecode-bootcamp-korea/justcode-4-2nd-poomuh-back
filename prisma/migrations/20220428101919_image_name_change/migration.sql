/*
  Warnings:

  - You are about to drop the column `image` on the `real_estates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `image`,
    ADD COLUMN `room_image` VARCHAR(191) NULL;
