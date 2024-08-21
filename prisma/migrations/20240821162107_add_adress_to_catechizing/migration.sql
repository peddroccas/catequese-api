/*
  Warnings:

  - Added the required column `adress` to the `catechizings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catechizings" ADD COLUMN     "adress" TEXT NOT NULL;
