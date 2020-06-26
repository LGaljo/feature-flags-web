import {BaseEntity} from './BaseEntity';
import {Application} from './Application';

export class Flag extends BaseEntity {
  defaultValue: number;
  name: string;
  description: string;
  dataType: DataType;
  application: Application;
}

export enum DataType {
  INT = 'INT', BOOL = 'BOOL'
}
