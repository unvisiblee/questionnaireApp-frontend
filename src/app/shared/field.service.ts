import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FieldResponsePayload} from '../field/field-response.payload';
import {FormResponsePayload} from '../field/form-response.payload';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private fieldApi = environment.apiUrl + 'api/field';
  private formApi = environment.apiUrl + 'api/form';

  constructor(private httpClient: HttpClient) { }

  public getFormByUserId(userId: number): Observable<FormResponsePayload> {
    const options = {headers: {'Access-Control-Allow-Origin': '*'}};
    return this.httpClient.get<FormResponsePayload>(    this.formApi + '/' + userId);
  }
}
