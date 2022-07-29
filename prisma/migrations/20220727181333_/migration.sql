/*
  Warnings:

  - You are about to drop the column `lat1` on the `GeoLocation` table. All the data in the column will be lost.
  - You are about to drop the column `lat2` on the `GeoLocation` table. All the data in the column will be lost.
  - You are about to drop the column `lon1` on the `GeoLocation` table. All the data in the column will be lost.
  - You are about to drop the column `lon2` on the `GeoLocation` table. All the data in the column will be lost.
  - Added the required column `lat` to the `GeoLocation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lon` to the `GeoLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeoLocation" DROP COLUMN "lat1",
DROP COLUMN "lat2",
DROP COLUMN "lon1",
DROP COLUMN "lon2",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lon" DOUBLE PRECISION NOT NULL;
