/*
  Warnings:

  - Made the column `nickname` on table `real_estate_agents` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nickname` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `real_estate_agents` MODIFY `nickname` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `nickname` VARCHAR(191) NOT NULL;
