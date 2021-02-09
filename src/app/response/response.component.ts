import { Component, OnInit } from '@angular/core';
import {FormResponsePayload} from '../field/form-response.payload';
import {ResponseServerResponsePayload} from '../questionnaire/response-serverResponse.payload';
import {FieldService} from '../shared/field.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ResponseService} from '../shared/response.service';
import {FieldResponsePayload} from '../field/field-response.payload';
import {ResponseForFieldsResponsePayload} from '../questionnaire/responseForFields-response.payload';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  form: FormResponsePayload;
  responses: ResponseServerResponsePayload[];


  constructor(private fieldService: FieldService, private localStorage: LocalStorageService, private responseService: ResponseService) {
    this.form = {
      id: 0,
      userId: 0,
      fields: []
    };
    this.responses = [];
  }

  ngOnInit(): void {
    const userId = JSON.parse(this.localStorage.retrieve('userdetails')).id;
    this.fieldService.getFormByUserId(userId).subscribe((data) => {
      this.form = data;
      this.loadResponses();
      console.log(this.form);
    });
  }

  getResponseContentForField(field: FieldResponsePayload, responsesForFields: ResponseForFieldsResponsePayload[]): string {
    const returnValueResponse = responsesForFields.filter((responseForField) => {
      return responseForField.fieldId === field.id;
    })[0];

    if (returnValueResponse !== undefined) {
      return  returnValueResponse.content;
    } else {
      return 'N/A';
    }
  }

  loadResponses(): void {
    this.responseService.getResponsesByFormId(this.form.id).subscribe((data) => {
      this.responses = data;
      console.log(this.responses);
    });
  }

}
