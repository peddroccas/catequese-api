/*
  Warnings:

  - The `personWithSpecialNeeds` column on the `catechizings` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "catechizings" DROP COLUMN "personWithSpecialNeeds",
ADD COLUMN     "personWithSpecialNeeds" BOOLEAN;
