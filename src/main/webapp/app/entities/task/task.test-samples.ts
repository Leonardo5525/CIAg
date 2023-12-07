import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 24789,
};

export const sampleWithPartialData: ITask = {
  id: 5334,
};

export const sampleWithFullData: ITask = {
  id: 5242,
  title: 'as boohoo hornet',
  description: 'hearten trapezium',
};

export const sampleWithNewData: NewTask = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
