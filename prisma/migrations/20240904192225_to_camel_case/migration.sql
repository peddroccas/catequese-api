/*
  Warnings:

  - You are about to drop the column `classroom_id` on the `catechists` table. All the data in the column will be lost.
  - You are about to drop the column `classroom_id` on the `catechizings` table. All the data in the column will be lost.
  - You are about to drop the column `catechizing_id` on the `parents` table. All the data in the column will be lost.
  - You are about to drop the column `catechizing_id` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `hasReceivedTickeT` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[catechizingId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `catechizingId` to the `parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `catechizingId` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "catechists" DROP CONSTRAINT "catechists_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "catechizings" DROP CONSTRAINT "catechizings_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "parents" DROP CONSTRAINT "parents_catechizing_id_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_catechizing_id_fkey";

-- DropIndex
DROP INDEX "payments_catechizing_id_key";

-- AlterTable
ALTER TABLE "catechists" DROP COLUMN "classroom_id",
ADD COLUMN     "classroomId" TEXT;

-- AlterTable
ALTER TABLE "catechizings" DROP COLUMN "classroom_id",
ADD COLUMN     "classroomId" TEXT;

-- AlterTable
ALTER TABLE "parents" DROP COLUMN "catechizing_id",
ADD COLUMN     "catechizingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "catechizing_id",
DROP COLUMN "hasReceivedTickeT",
ADD COLUMN     "catechizingId" TEXT NOT NULL,
ADD COLUMN     "hasReceivedTicket" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "payments_catechizingId_key" ON "payments"("catechizingId");

-- AddForeignKey
ALTER TABLE "catechists" ADD CONSTRAINT "catechists_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechizings" ADD CONSTRAINT "catechizings_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_catechizingId_fkey" FOREIGN KEY ("catechizingId") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_catechizingId_fkey" FOREIGN KEY ("catechizingId") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
