import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 27564,
};

export const sampleWithPartialData: IRegion = {
  id: 10095,
  regionName: 'exonerate incidentally',
};

export const sampleWithFullData: IRegion = {
  id: 25023,
  regionName: 'if',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
