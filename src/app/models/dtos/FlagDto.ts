export class FlagDto {
  appId: number;
  dataType: DataType;
  defaultValue: number;
  description: string;
  expirationDate: Date;
  id: number;
  name: string;
}

export enum DataType {
  INT = 'INT', BOOL = 'BOOL'
}
