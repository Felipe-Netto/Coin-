/*
  Warnings:

  - Added the required column `data_alvo` to the `Metas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metas" ADD COLUMN     "data_alvo" TIMESTAMP(3) NOT NULL;
