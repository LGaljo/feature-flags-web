import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FlagDto} from '../models/FlagDto';
import {catchError} from 'rxjs/operators';
import {RuleDto} from '../models/RuleDto';
import {CreateRuleDto} from '../models/dtos/CreateRuleDto';

@Injectable({
  providedIn: 'root'
})
export class FlagsService extends BaseService<any> {
  private static readonly ENTITY_ENDPOINT: string = '/flags';

  constructor(protected http: HttpClient) {
    super(http, FlagsService.ENTITY_ENDPOINT);
  }

  getFlag(id: number) {
    const params = new HttpParams();
    return this.http.get<FlagDto>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/${id}`, {
      headers: this.headers,
      params
    })
      .pipe(catchError(BaseService.handleError));
  }

  createRule(rule: CreateRuleDto, appId: number, flagId: number) {
    const params = new HttpParams();
    params.set('appId', String(appId));
    params.set('flagId', String(flagId));
    return this.http.post<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/rule`,
      rule,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }
}
