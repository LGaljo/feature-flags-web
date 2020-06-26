import {BaseEntity} from './BaseEntity';
import {Flag} from './Flag';
import {EndUser} from './EndUser';

export class Application extends BaseEntity{
  name: string;
  flags: Flag[];
  users: EndUser[];
}
