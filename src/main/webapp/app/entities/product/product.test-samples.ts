import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 11410,
  name: 'for freely',
  price: 17177.64,
  productSize: 'S',
};

export const sampleWithPartialData: IProduct = {
  id: 26524,
  name: 'belated',
  description: 'absentmindedly',
  price: 31348.75,
  productSize: 'L',
};

export const sampleWithFullData: IProduct = {
  id: 28666,
  name: 'anenst while',
  description: 'worth',
  price: 16618.55,
  productSize: 'XL',
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
};

export const sampleWithNewData: NewProduct = {
  name: 'during',
  price: 6346.45,
  productSize: 'S',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
