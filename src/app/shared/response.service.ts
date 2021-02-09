import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResponseRequestPayload} from '../questionnaire/response-request.payload';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private responseApi = environment.apiUrl + 'api/response';

  constructor(private httpClient: HttpClient) { }

  createResponse(newResponse: ResponseRequestPayload): Observable<any>  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.post<void>(this.responseApi, JSON.stringify(newResponse), options);
  }

}
