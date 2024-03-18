/*
  Warnings:

  - You are about to drop the column `userId` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_userId_fkey";

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
