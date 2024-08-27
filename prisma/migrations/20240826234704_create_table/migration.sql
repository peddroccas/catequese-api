-- CreateTable
CREATE TABLE "catechists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "receivedBaptism" BOOLEAN NOT NULL,
    "receivedEucharist" BOOLEAN NOT NULL,
    "receivedConfirmation" BOOLEAN NOT NULL,
    "receivedMarriage" BOOLEAN,
    "email" TEXT,
    "password_hash" TEXT,
    "classroom_id" TEXT,

    CONSTRAINT "catechists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catechizings" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "age" DECIMAL(65,30),
    "adress" TEXT NOT NULL,
    "personWithSpecialNeeds" TEXT,
    "hasReceivedBaptism" BOOLEAN NOT NULL,
    "hasReceivedEucharist" BOOLEAN NOT NULL,
    "hasReceivedMarriage" BOOLEAN NOT NULL DEFAULT false,
    "classroom_id" TEXT,

    CONSTRAINT "catechizings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "kinship" TEXT NOT NULL,
    "catechizing_id" TEXT NOT NULL,

    CONSTRAINT "parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL,
    "roomNumber" DECIMAL(65,30),
    "segment" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "toBePaid" DOUBLE PRECISION NOT NULL DEFAULT 150,
    "hasReceivedTickeT" BOOLEAN NOT NULL DEFAULT false,
    "catechizing_id" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "installments" (
    "id" TEXT NOT NULL,
    "payedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DOUBLE PRECISION NOT NULL,
    "payment_id" TEXT NOT NULL,

    CONSTRAINT "installments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "catechists_email_key" ON "catechists"("email");

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_roomNumber_key" ON "classrooms"("roomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "payments_catechizing_id_key" ON "payments"("catechizing_id");

-- AddForeignKey
ALTER TABLE "catechists" ADD CONSTRAINT "catechists_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechizings" ADD CONSTRAINT "catechizings_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parents" ADD CONSTRAINT "parents_catechizing_id_fkey" FOREIGN KEY ("catechizing_id") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_catechizing_id_fkey" FOREIGN KEY ("catechizing_id") REFERENCES "catechizings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
