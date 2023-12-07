import { ILocation, NewLocation } from './location.model';

export const sampleWithRequiredData: ILocation = {
  id: 25901,
};

export const sampleWithPartialData: ILocation = {
  id: 4385,
  city: 'Ocala',
  stateProvince: 'until faithful',
};

export const sampleWithFullData: ILocation = {
  id: 10186,
  streetAddress: 'nor batter spectacular',
  postalCode: 'association apropos deafen',
  city: 'Spencershire',
  stateProvince: 'deeply',
};

export const sampleWithNewData: NewLocation = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
