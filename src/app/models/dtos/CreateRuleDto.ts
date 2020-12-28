import {DataType} from './FlagDto';

export class CreateRuleDto {
  ruleType: RuleType;
  dataType: DataType;
  shares: Share[];
  user: number;
  changeDefault: boolean;
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
  GENERAL = 'GENERAL',
  AB_TESTING = 'AB_TESTING',
  INDIVIDUAL = 'INDIVIDUAL',
  GRADUAL_ROLLOUT = 'GRADUAL_ROLLOUT'
}
