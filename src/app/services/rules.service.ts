import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {CreateRuleDto} from '../models/dtos/CreateRuleDto';
import {catchError} from 'rxjs/operators';
import {RuleDto} from '../models/RuleDto';

@Injectable({
  providedIn: 'root'
})
export class RulesService extends BaseService<any> {
  private static readonly ENTITY_ENDPOINT: string = '/rules';

  constructor(protected http: HttpClient) {
    super(http, RulesService.ENTITY_ENDPOINT);
  }

  createRule(rule: CreateRuleDto, appId: number, flagId: number) {
    const params = new HttpParams()
      .set('app_id', String(appId))
      .set('flag_id', String(flagId));
    return this.http.post<any>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`,
      rule,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }

  getRulesForFlag(appId: number, flagId: number) {
    const params = new HttpParams()
      .set('flag_id', String(flagId));
    return this.http.get<RuleDto[]>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/flag`,
      {
        headers: this.headers,
        params
      })
      .pipe(catchError(BaseService.handleError));
  }
}
