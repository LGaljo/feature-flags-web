import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {CreateRuleDto} from '../models/dtos/CreateRuleDto';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService<any> {

  private static readonly ENTITY_ENDPOINT: string = '/admin';

  constructor(protected http: HttpClient) {
    super(http, AdminService.ENTITY_ENDPOINT);
  }

  clearDatabase() {
    const params = new HttpParams();
    return this.http.post<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/clear`,
      {},
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }

  seedDatabase() {
    const params = new HttpParams();
    return this.http.post<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/seed`,
      {},
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }
}
