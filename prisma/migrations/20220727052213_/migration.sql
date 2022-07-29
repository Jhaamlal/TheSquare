/*
  Warnings:

  - A unique constraint covering the columns `[noncompositeId]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "noncompositeId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_noncompositeId_key" ON "Friendship"("noncompositeId");
