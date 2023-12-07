import { IProdutos, NewProdutos } from './produtos.model';

export const sampleWithRequiredData: IProdutos = {
  id: 29108,
};

export const sampleWithPartialData: IProdutos = {
  id: 751,
  categoria: 'phooey',
};

export const sampleWithFullData: IProdutos = {
  id: 8548,
  nome: 'participation comradeship notwithstanding',
  preco: 20645.91,
  categoria: 'needily apprehension except',
  imagem: 'mutt',
};

export const sampleWithNewData: NewProdutos = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
