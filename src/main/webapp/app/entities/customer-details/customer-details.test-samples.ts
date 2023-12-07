import { ICustomerDetails, NewCustomerDetails } from './customer-details.model';

export const sampleWithRequiredData: ICustomerDetails = {
  id: 31215,
  gender: 'MALE',
  phone: '(642) 254-2510 x51751',
  addressLine1: 'radiosonde plough grunt',
  city: 'New Ken',
  country: 'Eritrea',
};

export const sampleWithPartialData: ICustomerDetails = {
  id: 30821,
  gender: 'FEMALE',
  phone: '276-912-4719 x4935',
  addressLine1: 'gosh',
  city: 'Lindville',
  country: 'Slovakia',
};

export const sampleWithFullData: ICustomerDetails = {
  id: 24945,
  gender: 'MALE',
  phone: '579-584-9304',
  addressLine1: 'celebrity',
  addressLine2: 'yowza',
  city: "D'Amoreborough",
  country: 'Faroe Islands',
};

export const sampleWithNewData: NewCustomerDetails = {
  gender: 'FEMALE',
  phone: '972.530.3401 x087',
  addressLine1: 'plus',
  city: 'East Honolulu',
  country: 'Germany',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
