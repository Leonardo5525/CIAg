import { IDepartment, NewDepartment } from './department.model';

export const sampleWithRequiredData: IDepartment = {
  id: 8804,
  departmentName: 'beautifully',
};

export const sampleWithPartialData: IDepartment = {
  id: 20365,
  departmentName: 'ultimately',
};

export const sampleWithFullData: IDepartment = {
  id: 7227,
  departmentName: 'dry',
};

export const sampleWithNewData: NewDepartment = {
  departmentName: 'why concerning',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
