/*
  Warnings:

  - Added the required column `valor_alvo` to the `Metas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metas" ADD COLUMN     "valor_alvo" DECIMAL(65,30) NOT NULL;
