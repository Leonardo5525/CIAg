export interface IProdutos {
  id: number;
  nome?: string | null;
  preco?: number | null;
  categoria?: string | null;
  imagem?: string | null;
}

export type NewProdutos = Omit<IProdutos, 'id'> & { id: null };
