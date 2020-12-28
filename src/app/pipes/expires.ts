import { Pipe, PipeTransform } from '@angular/core';
/*
 * Returns difference between dates
*/
@Pipe({name: 'expiresIn'})
export class ExpiresPipe implements PipeTransform {
  transform(expirationDate: Date): string {
    if (!expirationDate) {
      return '';
    }

    const days = Math.ceil(
      (Date.parse(expirationDate.toString()) - Date.now())
       / (1000 * 3600 * 24));

    const hours = Math.ceil(
      (Date.parse(expirationDate.toString()) - Date.now())
       / (1000 * 3600) % 24);

    if (days === 1) {
      if (hours === 1) {
        return '1 hour';
      } else {
        return hours + ' hours';
      }
    } else {
      return days + ' days';
    }
  }
}
