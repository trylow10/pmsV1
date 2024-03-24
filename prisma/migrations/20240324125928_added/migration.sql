/*
  Warnings:

  - A unique constraint covering the columns `[companyCloth]` on the table `Cloth` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[color]` on the table `Sheet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[type]` on the table `Size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cloth_companyCloth_key" ON "Cloth"("companyCloth");

-- CreateIndex
CREATE UNIQUE INDEX "Sheet_color_key" ON "Sheet"("color");

-- CreateIndex
CREATE UNIQUE INDEX "Size_type_key" ON "Size"("type");
