-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_sheetId_fkey";

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "Sheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
