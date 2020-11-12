import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {BaseService} from './base.service';
import {EndUserDto} from '../models/dtos/EndUserDto';

@Injectable({
  providedIn: 'root'
})
export class EndUsersService extends BaseService<any> {
  private static readonly ENTITY_ENDPOINT: string = '/user';

  constructor(protected http: HttpClient) {
    super(http, EndUsersService.ENTITY_ENDPOINT);
  }

  getUsersOfApp(id: number) {
    const params = new HttpParams().set('app_id', String(id));
    return this.http.get<EndUserDto[]>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`, {
      headers: this.headers,
      params
    })
      .pipe(catchError(BaseService.handleError));
  }
}

