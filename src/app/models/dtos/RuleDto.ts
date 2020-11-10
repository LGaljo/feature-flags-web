import {BaseEntity} from '../BaseEntity';
import {DataType} from '../Flag';

export class RuleDto extends BaseEntity {
  id: number;
  value: number;
  name: string;
  description: string;
  dataType: DataType;
  clientId: string;
  expirationDate;
}
