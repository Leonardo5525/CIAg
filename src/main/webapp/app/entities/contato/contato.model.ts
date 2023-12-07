export interface IContato {
  id: number;
  nome?: string | null;
  email?: string | null;
  telefone?: string | null;
  rg?: string | null;
  cpf?: string | null;
}

export type NewContato = Omit<IContato, 'id'> & { id: null };
