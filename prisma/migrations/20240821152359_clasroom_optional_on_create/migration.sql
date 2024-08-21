-- DropForeignKey
ALTER TABLE "catechists" DROP CONSTRAINT "catechists_classroom_id_fkey";

-- DropForeignKey
ALTER TABLE "catechizings" DROP CONSTRAINT "catechizings_classroom_id_fkey";

-- AlterTable
ALTER TABLE "catechists" ALTER COLUMN "classroom_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "catechizings" ALTER COLUMN "classroom_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "catechists" ADD CONSTRAINT "catechists_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catechizings" ADD CONSTRAINT "catechizings_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classrooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
