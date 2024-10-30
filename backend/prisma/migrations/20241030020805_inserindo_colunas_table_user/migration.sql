/*
  Warnings:

  - Added the required column `nascimento` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nascimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
