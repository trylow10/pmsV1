/*
  Warnings:

  - Changed the type of `sizeType` on the `Bundle` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `freeSize` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bundle" DROP COLUMN "sizeType",
ADD COLUMN     "sizeType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "freeSize" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "FabricSize";
