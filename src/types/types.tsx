export interface Goal {
    id_meta: number;
    nome: string;
    descricao: string;
    valor_alvo: number;
    valor_atual: number;
    data_alvo: string;
    lancamentos: { id_lancamento: number; id_meta: number; valor: number; created_at: string }[];
    contributions: { amount: number; date: string }[];
  }