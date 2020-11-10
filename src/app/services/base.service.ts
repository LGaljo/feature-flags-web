import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ExceptionDto} from '../models/dtos/ExceptionDto';

export class BaseService<Type> {

  protected headers: HttpHeaders;
  protected readonly actionUrl: string;
  protected readonly ENTITY_ENDPOINT: string;

  constructor(protected http: HttpClient, ENTITY_ENDPOINT: string) {
    this.ENTITY_ENDPOINT = ENTITY_ENDPOINT;
    this.actionUrl = environment.backendUrl;
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  static handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else if (error.error.status && error.error.message) {
      return throwError(error.error);
    } else {
      console.error(`Backend returned code ${error.status}`);
      console.log(error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }

  getAll(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.actionUrl}${this.ENTITY_ENDPOINT}`, {
      headers: this.headers
    })
      .pipe(catchError(BaseService.handleError));
  }

  get(id: number): Observable<Type> {
    return this.http.get<Type>(`${this.actionUrl}${this.ENTITY_ENDPOINT}/${id}`, {
      headers: this.headers
    })
      .pipe(catchError(BaseService.handleError));
  }
}
