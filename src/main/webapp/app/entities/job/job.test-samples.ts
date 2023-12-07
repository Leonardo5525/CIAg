import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: 2451,
};

export const sampleWithPartialData: IJob = {
  id: 26026,
  jobTitle: 'Corporate Accounts Assistant',
  minSalary: 17940,
  maxSalary: 25717,
};

export const sampleWithFullData: IJob = {
  id: 235,
  jobTitle: 'Senior Accounts Engineer',
  minSalary: 17501,
  maxSalary: 29558,
};

export const sampleWithNewData: NewJob = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
