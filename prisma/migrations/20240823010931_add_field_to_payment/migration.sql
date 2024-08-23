-- AlterTable
ALTER TABLE "Installment" ALTER COLUMN "payedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "hasReceivedTicker" BOOLEAN NOT NULL DEFAULT false;
