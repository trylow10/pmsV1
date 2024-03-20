/*
  Warnings:

  - You are about to drop the column `sizeType` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Cloth` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Sheet` table. All the data in the column will be lost.
  - Added the required column `sizeId` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cloth" DROP CONSTRAINT "Cloth_userId_fkey";

-- AlterTable
ALTER TABLE "Bundle" DROP COLUMN "sizeType",
ADD COLUMN     "sizeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cloth" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Sheet" DROP COLUMN "size";

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sheetId" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
