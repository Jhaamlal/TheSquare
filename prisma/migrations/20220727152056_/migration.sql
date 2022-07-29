/*
  Warnings:

  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geoLocationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "geoLocationId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GeoLocation" (
    "id" SERIAL NOT NULL,
    "lat1" DOUBLE PRECISION NOT NULL,
    "lat2" DOUBLE PRECISION NOT NULL,
    "lon1" DOUBLE PRECISION NOT NULL,
    "lon2" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GeoLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_geoLocationId_fkey" FOREIGN KEY ("geoLocationId") REFERENCES "GeoLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
