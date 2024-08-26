-- CreateTable
CREATE TABLE "catechists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "phone" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "receivedBaptism" BOOLEAN NOT NULL,
    "receivedEucharist" BOOLEAN NOT NULL,
    "receivedConfirmation" BOOLEAN NOT NULL,
    "receivedMarriage" BOOLEAN,
    "email" TEXT,
    "password_hash" TEXT,
    "classroom_id" TEXT,
    CONSTRAINT "catechists_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "catechizings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "age" DECIMAL,
    "adress" TEXT NOT NULL,
    "personWithSpecialNeeds" TEXT,
    "hasReceivedBaptism" BOOLEAN NOT NULL,
    "hasReceivedEucharist" BOOLEAN NOT NULL,
    "hasReceivedMarriage" BOOLEAN NOT NULL DEFAULT false,
    "classroom_id" TEXT,
    CONSTRAINT "catechizings_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "kinship" TEXT NOT NULL,
    "catechizing_id" TEXT NOT NULL,
    CONSTRAINT "Parent_catechizing_id_fkey" FOREIGN KEY ("catechizing_id") REFERENCES "catechizings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomNumber" DECIMAL,
    "segment" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "toBePaid" REAL NOT NULL DEFAULT 150,
    "hasReceivedTickeT" BOOLEAN NOT NULL DEFAULT false,
    "catechizing_id" TEXT NOT NULL,
    CONSTRAINT "payments_catechizing_id_fkey" FOREIGN KEY ("catechizing_id") REFERENCES "catechizings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Installment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "payedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" REAL NOT NULL,
    "payment_id" TEXT NOT NULL,
    CONSTRAINT "Installment_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "catechists_email_key" ON "catechists"("email");

-- CreateIndex
CREATE UNIQUE INDEX "classrooms_roomNumber_key" ON "classrooms"("roomNumber");

-- CreateIndex
CREATE UNIQUE INDEX "payments_catechizing_id_key" ON "payments"("catechizing_id");
