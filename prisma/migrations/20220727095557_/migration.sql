/*
  Warnings:

  - Added the required column `mainPost` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mainPost" TEXT NOT NULL,
ADD COLUMN     "postImage" TEXT;
