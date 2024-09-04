/*
  Warnings:

  - You are about to drop the column `receivedBaptism` on the `catechists` table. All the data in the column will be lost.
  - You are about to drop the column `receivedConfirmation` on the `catechists` table. All the data in the column will be lost.
  - You are about to drop the column `receivedEucharist` on the `catechists` table. All the data in the column will be lost.
  - You are about to drop the column `receivedMarriage` on the `catechists` table. All the data in the column will be lost.
  - Added the required column `hasReceivedBaptism` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasReceivedConfirmation` to the `catechists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasReceivedEucharist` to the `catechists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catechists" DROP COLUMN "receivedBaptism",
DROP COLUMN "receivedConfirmation",
DROP COLUMN "receivedEucharist",
DROP COLUMN "receivedMarriage",
ADD COLUMN     "hasReceivedBaptism" BOOLEAN NOT NULL,
ADD COLUMN     "hasReceivedConfirmation" BOOLEAN NOT NULL,
ADD COLUMN     "hasReceivedEucharist" BOOLEAN NOT NULL,
ADD COLUMN     "hasReceivedMarriage" BOOLEAN;
