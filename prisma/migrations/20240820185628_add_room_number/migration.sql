/*
  Warnings:

  - A unique constraint covering the columns `[roomNumber]` on the table `classrooms` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "classrooms" ADD COLUMN     "roomNumber" DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_roomNumber_key" ON "classrooms"("roomNumber");
