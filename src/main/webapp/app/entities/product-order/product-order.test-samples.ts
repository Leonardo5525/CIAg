import { IProductOrder, NewProductOrder } from './product-order.model';

export const sampleWithRequiredData: IProductOrder = {
  id: 5201,
  quantity: 2569,
  totalPrice: 21422.81,
};

export const sampleWithPartialData: IProductOrder = {
  id: 6406,
  quantity: 27976,
  totalPrice: 23158.09,
};

export const sampleWithFullData: IProductOrder = {
  id: 12738,
  quantity: 31726,
  totalPrice: 3761.91,
};

export const sampleWithNewData: NewProductOrder = {
  quantity: 20243,
  totalPrice: 26999.73,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
