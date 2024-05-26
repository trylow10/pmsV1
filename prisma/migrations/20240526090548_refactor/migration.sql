/*
  Warnings:

  - You are about to drop the column `quantity` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `receivedQty` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "quantity",
ADD COLUMN     "receivedQty" INTEGER NOT NULL;
