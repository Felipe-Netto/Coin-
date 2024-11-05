-- CreateTable
CREATE TABLE "Lancamentos" (
    "id_lancamento" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_categoria" INTEGER,
    "saida" BOOLEAN NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Lancamentos_pkey" PRIMARY KEY ("id_lancamento")
);

-- AddForeignKey
ALTER TABLE "Lancamentos" ADD CONSTRAINT "Lancamentos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamentos" ADD CONSTRAINT "Lancamentos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE SET NULL ON UPDATE CASCADE;
