import {FlagDto} from './FlagDto';

export class AppDto {
  id: number;
  name: string;
  flags: FlagDto[];
  hasExpiredFlags: boolean;
}
