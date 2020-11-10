import {DataType} from '../Flag';

export class FlagDto {
  id: number;
  defaultValue: number;
  name: string;
  description: string;
  dataType: DataType;
}
