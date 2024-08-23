/*
  Warnings:

  - Added the required column `adress` to the `catechists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "catechists" ADD COLUMN     "adress" TEXT NOT NULL;
