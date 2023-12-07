import dayjs from 'dayjs/esm';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 20185,
};

export const sampleWithPartialData: IEmployee = {
  id: 18808,
  phoneNumber: 'babushka',
  hireDate: dayjs('2023-11-28T01:33'),
  salary: 10876,
  commissionPct: 6285,
};

export const sampleWithFullData: IEmployee = {
  id: 25738,
  firstName: 'Marietta',
  lastName: 'Beatty',
  email: 'Marcelina86@gmail.com',
  phoneNumber: 'studio mention soliloquy',
  hireDate: dayjs('2023-11-28T12:59'),
  salary: 275,
  commissionPct: 22524,
};

export const sampleWithNewData: NewEmployee = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
