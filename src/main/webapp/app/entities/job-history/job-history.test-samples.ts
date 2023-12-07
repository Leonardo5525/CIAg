import dayjs from 'dayjs/esm';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 30898,
};

export const sampleWithPartialData: IJobHistory = {
  id: 7502,
  startDate: dayjs('2023-11-28T09:05'),
  endDate: dayjs('2023-11-27T20:01'),
  language: 'ENGLISH',
};

export const sampleWithFullData: IJobHistory = {
  id: 28575,
  startDate: dayjs('2023-11-28T01:27'),
  endDate: dayjs('2023-11-28T11:33'),
  language: 'ENGLISH',
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
