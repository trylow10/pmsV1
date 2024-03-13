/*
  Warnings:

  - You are about to drop the column `sizeId` on the `Bundle` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `length` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `workerId` on the `Inventory` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assignedDate` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bundleId` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bundleSize` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryId` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeType` to the `Bundle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Lsize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Msize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Ssize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `XLsize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `XXLsize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `XXXLsize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalOfSize` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weightPerLenght` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `remarks` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `inventoryId` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bundle" DROP CONSTRAINT "Bundle_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_workerId_fkey";

-- AlterTable
ALTER TABLE "Bundle" DROP COLUMN "sizeId",
ADD COLUMN     "assignedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "bundleId" TEXT NOT NULL,
ADD COLUMN     "bundleSize" INTEGER NOT NULL,
ADD COLUMN     "inventoryId" TEXT NOT NULL,
ADD COLUMN     "sizeType" "FabricSize" NOT NULL;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "companyId",
DROP COLUMN "length",
DROP COLUMN "quantity",
DROP COLUMN "sizeId",
DROP COLUMN "total",
DROP COLUMN "weight",
DROP COLUMN "workerId",
ADD COLUMN     "Lsize" INTEGER NOT NULL,
ADD COLUMN     "Msize" INTEGER NOT NULL,
ADD COLUMN     "Ssize" INTEGER NOT NULL,
ADD COLUMN     "XLsize" INTEGER NOT NULL,
ADD COLUMN     "XXLsize" INTEGER NOT NULL,
ADD COLUMN     "XXXLsize" INTEGER NOT NULL,
ADD COLUMN     "totalOfSize" INTEGER NOT NULL,
ADD COLUMN     "weightPerLenght" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "amount",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "rate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "remarks" SET NOT NULL;

-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "inventoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Company";

-- DropTable
DROP TABLE "Size";

-- AddForeignKey
ALTER TABLE "Worker" ADD CONSTRAINT "Worker_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bundle" ADD CONSTRAINT "Bundle_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
