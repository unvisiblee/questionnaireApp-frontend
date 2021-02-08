import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormResponsePayload} from '../field/form-response.payload';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formApi = environment.apiUrl + 'api/form';


  constructor(private httpClient: HttpClient) { }

  getFormById(id: number): Observable<FormResponsePayload> {
    return this.httpClient.get<FormResponsePayload>(this.formApi + '/' + id);
  }
}
