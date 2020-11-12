import {DataType} from './FlagDto';

export class CreateRuleDto {
  ruleType: RuleType;
  dataType: DataType;
  shares: Share[];
  user: number;
}

export class Share {
  value: number;
  share: number;

  constructor(v: number, s: number) {
    this.value = v;
    this.share = s;
  }
}

export enum RuleType {
  SAME_FOR_EVERYONE = 'SAME_FOR_EVERYONE',
  AB_TESTING = 'AB_TESTING',
  USER_SPECIFIC = 'USER_SPECIFIC',
  GRADUAL_ROLLOUT = 'GRADUAL_ROLLOUT'
}
