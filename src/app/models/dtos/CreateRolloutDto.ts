import {BaseEntity} from '../BaseEntity';
import {TimeUnit} from './RolloutDto';

export class CreateRolloutDto extends BaseEntity {
  appId: number;
  flagId: number;
  interval: number;
  newValue: number;
  numOfSteps: number;
  timeUnit: TimeUnit;
}
