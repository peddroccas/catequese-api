/*
  Warnings:

  - You are about to drop the column `payment_id` on the `installments` table. All the data in the column will be lost.
  - Added the required column `paymentId` to the `installments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "installments" DROP CONSTRAINT "installments_payment_id_fkey";

-- AlterTable
ALTER TABLE "installments" DROP COLUMN "payment_id",
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
