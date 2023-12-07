import { ICountry, NewCountry } from './country.model';

export const sampleWithRequiredData: ICountry = {
  id: 16964,
};

export const sampleWithPartialData: ICountry = {
  id: 10849,
  countryName: 'opposite hoof gah',
};

export const sampleWithFullData: ICountry = {
  id: 15916,
  countryName: 'foolishly',
};

export const sampleWithNewData: NewCountry = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
