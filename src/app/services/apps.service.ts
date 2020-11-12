import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AppDto} from '../models/dtos/AppDto';

@Injectable({
  providedIn: 'root'
})
export class AppsService extends BaseService<any> {
  private static readonly ENTITY_ENDPOINT: string = '/applications';

  constructor(protected http: HttpClient) {
    super(http, AppsService.ENTITY_ENDPOINT);
  }

  create(name: string): Observable<AppDto> {
    const params = new HttpParams();
    return this.http.post<AppDto>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`, {name}, {
      headers: this.headers,
      params
    })
      .pipe(catchError(BaseService.handleError));
  }

  removeApp(id: number): Observable<any> {
    const params = new HttpParams();
    return this.http.delete<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/` + String(id),
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }
}
