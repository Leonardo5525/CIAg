import { IProductCategory, NewProductCategory } from './product-category.model';

export const sampleWithRequiredData: IProductCategory = {
  id: 11899,
  name: 'gadzooks quicker',
};

export const sampleWithPartialData: IProductCategory = {
  id: 6535,
  name: 'questionably ha farrow',
};

export const sampleWithFullData: IProductCategory = {
  id: 22520,
  name: 'turbulent joyously whereas',
  description: 'after tragic',
};

export const sampleWithNewData: NewProductCategory = {
  name: 'sharply',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
