import { Pipe, PipeTransform } from '@angular/core';
/*
 * Returns difference between dates in days
*/
@Pipe({name: 'expiresIn'})
export class ExpiresPipe implements PipeTransform {
  transform(expirationDate: Date): number {
    if (!expirationDate) {
      return 0;
    }
    return Math.ceil(
      Math.abs(Date.now() - Date.parse(expirationDate.toString())
      ) / (1000 * 3600 * 24));
  }
}
