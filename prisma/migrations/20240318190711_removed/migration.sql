/*
  Warnings:

  - Added the required column `bundleSize` to the `Bundle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bundle" ADD COLUMN     "bundleSize" INTEGER NOT NULL;
