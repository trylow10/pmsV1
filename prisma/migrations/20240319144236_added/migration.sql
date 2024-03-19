/*
  Warnings:

  - Added the required column `average` to the `Sheet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sheet" DROP CONSTRAINT "Sheet_clothId_fkey";

-- AlterTable
ALTER TABLE "Sheet" ADD COLUMN     "average" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Sheet" ADD CONSTRAINT "Sheet_clothId_fkey" FOREIGN KEY ("clothId") REFERENCES "Cloth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
