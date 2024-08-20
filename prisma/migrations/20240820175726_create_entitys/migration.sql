-- CreateTable
CREATE TABLE "catechists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "classroom_id" TEXT NOT NULL,

    CONSTRAINT "catechists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catechizings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classroom_id" TEXT NOT NULL,

    CONSTRAINT "catechizings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL,
    "segment" TEXT NOT NULL,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "toBePaid" DOUBLE PRECISION NOT NULL DEFAULT 150,
    "catechizing_id" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" TEXT NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "payment_id" TEXT NOT NULL,

    CONSTRAINT "Installment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catechists_email_key" ON "catechists"("email");

-- AddForeignKey
ALTER TABLE "catechists" ADD CONSTRAINT "catechists_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechizings" ADD CONSTRAINT "catechizings_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_catechizing_id_fkey" FOREIGN KEY ("catechizing_id") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
