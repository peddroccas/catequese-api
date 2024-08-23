/*
  Warnings:

  - Made the column `hasReceivedMarriage` on table `catechizings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "catechizings" ALTER COLUMN "hasReceivedMarriage" SET NOT NULL,
ALTER COLUMN "hasReceivedMarriage" SET DEFAULT false;
