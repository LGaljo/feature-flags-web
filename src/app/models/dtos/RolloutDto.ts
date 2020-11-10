import {BaseEntity} from '../BaseEntity';
import {Application} from '../Application';
import {FlagDto} from './FlagDto';

export class RolloutDto extends BaseEntity {
  id: number;
  application: Application;
  completed: number;
  flag: FlagDto;
  interval: number;
  newValue: number;
  numOfSteps: number;
  timeUnit: TimeUnit;
  uuid: string;
}

export enum TimeUnit {
  SECONDS = 'SECONDS', MINUTES = 'MINUTES', HOURS = 'HOURS', DAYS = 'DAYS'
}
