import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ResponseRequestPayload} from '../questionnaire/response-request.payload';
import {Observable} from 'rxjs';
import {FormResponsePayload} from '../field/form-response.payload';
import {ResponseServerResponsePayload} from '../questionnaire/response-serverResponse.payload';

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

  getResponsesByFormId(formId: number): Observable<ResponseServerResponsePayload[]> {
    return this.httpClient.get<ResponseServerResponsePayload[]>(this.responseApi + '/by-form/' + formId.toString());
  }

}
