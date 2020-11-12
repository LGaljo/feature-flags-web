import {TimeUnit} from './RolloutDto';

export class CreateRolloutDto {
  appId: number;
  flagId: number;
  interval: number;
  newValue: number;
  numOfSteps: number;
  timeUnit: TimeUnit;
}
