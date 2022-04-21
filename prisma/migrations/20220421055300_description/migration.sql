/*
  Warnings:

  - You are about to drop the column `descrption_detail` on the `real_estates` table. All the data in the column will be lost.
  - You are about to drop the column `descrption_title` on the `real_estates` table. All the data in the column will be lost.
  - Added the required column `description_detail` to the `real_estates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_title` to the `real_estates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `real_estates` DROP COLUMN `descrption_detail`,
    DROP COLUMN `descrption_title`,
    ADD COLUMN `description_detail` VARCHAR(1000) NOT NULL,
    ADD COLUMN `description_title` VARCHAR(191) NOT NULL;
