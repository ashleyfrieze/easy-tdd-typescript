import emp1 from '../data/emp1.json';
import { cloneDeep } from 'lodash';

export const createEmployee = (id: string) => ({ ...cloneDeep(emp1), id });
