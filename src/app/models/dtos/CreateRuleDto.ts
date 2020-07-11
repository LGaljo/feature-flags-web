import {DataType} from '../Flag';

export class CreateRuleDto {
  flagId: number;
  ruleType: RuleType;
  dataType: DataType;
  expirationDate: Date;
  value: number;
  valueB: number;
  name: string;
  description: string;
  shareOfA: number;
}

export enum RuleType {
  SAME_FOR_EVERYONE = 'SAME_FOR_EVERYONE',
  AB_TESTING = 'AB_TESTING',
  USER_SPECIFIC = 'USER_SPECIFIC'
}