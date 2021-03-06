import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FlagDto} from '../models/dtos/FlagDto';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlagsService extends BaseService<any> {
  private static readonly ENTITY_ENDPOINT: string = '/flags';

  constructor(protected http: HttpClient) {
    super(http, FlagsService.ENTITY_ENDPOINT);
  }

  getFlag(id: number) {
    const params = new HttpParams().set('id', String(id));
    return this.http.get<FlagDto>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`, {
      headers: this.headers,
      params
    })
      .pipe(catchError(BaseService.handleError));
  }

  getFlags(appId: number) {
    const params = new HttpParams().set('app_id', String(appId));
    return this.http.get<FlagDto[]>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/app`,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }

  createFlags(data: FlagDto[]) {
    const params = new HttpParams();
    return this.http.post<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`, data,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }

  removeFlag(id: number): Observable<any> {
    const params = new HttpParams().set('id', String(id));
    return this.http.delete<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }
}
