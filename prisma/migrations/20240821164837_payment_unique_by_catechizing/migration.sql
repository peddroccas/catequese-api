/*
  Warnings:

  - A unique constraint covering the columns `[catechizing_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payments_catechizing_id_key" ON "payments"("catechizing_id");
