import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FieldResponsePayload} from '../field/field-response.payload';
import {FormResponsePayload} from '../field/form-response.payload';
import {FieldRequestPayload} from '../field/field-request.payload';

@Injectable({
  providedIn: 'root'
})
export class FieldService {
  private fieldApi = environment.apiUrl + 'api/field';
  private formApi = environment.apiUrl + 'api/form';

  constructor(private httpClient: HttpClient) { }

  public getFormByUserId(userId: number): Observable<FormResponsePayload> {
    return this.httpClient.get<FormResponsePayload>(    this.formApi + '/by-user/' + userId);
  }

  updateField(fieldToEdit: FieldResponsePayload): Observable<FieldResponsePayload> {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.put<FieldResponsePayload>(this.fieldApi + '/' + fieldToEdit.id, JSON.stringify(fieldToEdit), options);
  }

  createField(fieldToCreate: FieldRequestPayload): Observable<FieldResponsePayload> {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.post<FieldResponsePayload>(this.fieldApi, JSON.stringify(fieldToCreate), options);
  }
}
