/*
  Warnings:

  - Made the column `saldo` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "saldo" SET NOT NULL,
ALTER COLUMN "saldo" SET DEFAULT 0;
