/*
  Warnings:

  - Added the required column `birthday` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedBaptism` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedConfirmation` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedEucharist` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `catechizings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedBaptism` to the `catechizings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receivedEucharist` to the `catechizings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catechists" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "receivedBaptism" BOOLEAN NOT NULL,
ADD COLUMN     "receivedConfirmation" BOOLEAN NOT NULL,
ADD COLUMN     "receivedEucharist" BOOLEAN NOT NULL,
ADD COLUMN     "receivedMarriage" BOOLEAN;

-- AlterTable
ALTER TABLE "catechizings" ADD COLUMN     "age" DECIMAL(65,30),
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "personWithSpecialNeeds" TEXT,
ADD COLUMN     "receivedBaptism" BOOLEAN NOT NULL,
ADD COLUMN     "receivedEucharist" BOOLEAN NOT NULL,
ADD COLUMN     "receivedMarriage" BOOLEAN;

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "kinship" TEXT NOT NULL,
    "catechizingId" TEXT NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_catechizingId_fkey" FOREIGN KEY ("catechizingId") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
