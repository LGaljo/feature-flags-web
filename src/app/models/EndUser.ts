import {BaseEntity} from './BaseEntity';
import {Application} from './Application';

export class EndUser extends BaseEntity {
  client: string;
  application: Application;
}
