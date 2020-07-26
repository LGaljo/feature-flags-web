import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {catchError} from 'rxjs/operators';
import {FlagDto} from '../models/FlagDto';
import {EndUser} from '../models/EndUser';

@Injectable({
  providedIn: 'root'
})
export class AppsService extends BaseService<any> {
  private static readonly ENTITY_ENDPOINT: string = '/applications';

  constructor(protected http: HttpClient) {
    super(http, AppsService.ENTITY_ENDPOINT);
  }

  getFlags(id: number) {
    const params = new HttpParams().set('app_id', String(id));
    return this.http.get<FlagDto[]>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/flags`, {
      headers: this.headers,
      params
    })
      .pipe(catchError(BaseService.handleError));
  }

  getUsersOfApp(id: number) {
    const params = new HttpParams().set('app_id', String(id));
    return this.http.get<EndUser[]>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/users`, {
      headers: this.headers,
      params
    })
      .pipe(catchError(BaseService.handleError));
  }

  createFlag(appId: number, flag: FlagDto[]) {
    const params = new HttpParams();
    return this.http.post<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/${String(appId)}/flags`, flag,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }
}
