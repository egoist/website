/*
  Warnings:

  - Made the column `publishedAt` on table `pages` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pages" ALTER COLUMN "publishedAt" SET NOT NULL,
ALTER COLUMN "publishedAt" SET DEFAULT CURRENT_TIMESTAMP;
