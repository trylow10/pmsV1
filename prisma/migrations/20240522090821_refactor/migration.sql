/*
  Warnings:

  - You are about to drop the column `sheetId` on the `Worker` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Worker" DROP CONSTRAINT "Worker_sheetId_fkey";

-- AlterTable
ALTER TABLE "Worker" DROP COLUMN "sheetId";
