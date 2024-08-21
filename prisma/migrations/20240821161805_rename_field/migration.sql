/*
  Warnings:

  - You are about to drop the column `catechizingId` on the `Parent` table. All the data in the column will be lost.
  - Added the required column `catechizing_id` to the `Parent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parent" DROP CONSTRAINT "Parent_catechizingId_fkey";

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "catechizingId",
ADD COLUMN     "catechizing_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_catechizing_id_fkey" FOREIGN KEY ("catechizing_id") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
