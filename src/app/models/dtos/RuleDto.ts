import {DataType} from './FlagDto';

export class RuleDto {
  id: number;
  value: number;
  name: string;
  description: string;
  dataType: DataType;
  clientId: string;
  expirationDate;
}
