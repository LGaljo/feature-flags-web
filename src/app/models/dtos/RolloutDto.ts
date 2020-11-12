import {FlagDto} from './FlagDto';
import {AppDto} from './AppDto';

export class RolloutDto {
  id: number;
  createdAt: Date;
  application: AppDto;
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
