/*
  Warnings:

  - You are about to drop the column `receivedBaptism` on the `catechizings` table. All the data in the column will be lost.
  - You are about to drop the column `receivedEucharist` on the `catechizings` table. All the data in the column will be lost.
  - You are about to drop the column `receivedMarriage` on the `catechizings` table. All the data in the column will be lost.
  - You are about to drop the column `hasReceivedTicker` on the `payments` table. All the data in the column will be lost.
  - Added the required column `hasReceivedBaptism` to the `catechizings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasReceivedEucharist` to the `catechizings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catechizings" DROP COLUMN "receivedBaptism",
DROP COLUMN "receivedEucharist",
DROP COLUMN "receivedMarriage",
ADD COLUMN     "hasReceivedBaptism" BOOLEAN NOT NULL,
ADD COLUMN     "hasReceivedEucharist" BOOLEAN NOT NULL,
ADD COLUMN     "hasReceivedMarriage" BOOLEAN;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "hasReceivedTicker",
ADD COLUMN     "hasReceivedTickeT" BOOLEAN NOT NULL DEFAULT false;
