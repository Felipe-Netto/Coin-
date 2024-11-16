-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" DATE,
    "telefone" TEXT NOT NULL,
    "token" TEXT,
    "saldo" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Categorias" (
    "id_categoria" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "Lancamentos" (
    "id_lancamento" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_categoria" INTEGER,
    "id_meta" INTEGER,
    "saida" BOOLEAN NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "Lancamentos_pkey" PRIMARY KEY ("id_lancamento")
);

-- CreateTable
CREATE TABLE "Metas" (
    "id_meta" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metas_pkey" PRIMARY KEY ("id_meta")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Categorias_nome_key" ON "Categorias"("nome");

-- AddForeignKey
ALTER TABLE "Lancamentos" ADD CONSTRAINT "Lancamentos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamentos" ADD CONSTRAINT "Lancamentos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categorias"("id_categoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamentos" ADD CONSTRAINT "Lancamentos_id_meta_fkey" FOREIGN KEY ("id_meta") REFERENCES "Metas"("id_meta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Metas" ADD CONSTRAINT "Metas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
