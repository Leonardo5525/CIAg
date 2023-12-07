import { IContato, NewContato } from './contato.model';

export const sampleWithRequiredData: IContato = {
  id: 25189,
};

export const sampleWithPartialData: IContato = {
  id: 20119,
  nome: 'guilty sibling',
  cpf: 'gah yuck',
};

export const sampleWithFullData: IContato = {
  id: 31135,
  nome: 'notwithstanding',
  email: 'Hilma_Ritchie@yahoo.com',
  telefone: 'sizzling',
  rg: 'why',
  cpf: 'within surrender geez',
};

export const sampleWithNewData: NewContato = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
