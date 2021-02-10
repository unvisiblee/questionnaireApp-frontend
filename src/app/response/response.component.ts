import { Component, OnInit } from '@angular/core';
import {FormResponsePayload} from '../field/form-response.payload';
import {ResponseServerResponsePayload} from '../questionnaire/response-serverResponse.payload';
import {FieldService} from '../shared/field.service';
import {LocalStorageService} from 'ngx-webstorage';
import {ResponseService} from '../shared/response.service';
import {FieldResponsePayload} from '../field/field-response.payload';
import {ResponseForFieldsResponsePayload} from '../questionnaire/responseForFields-response.payload';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {error} from '@rxweb/reactive-form-validators';
import {fromEvent} from 'rxjs';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  form: FormResponsePayload;
  responses: ResponseServerResponsePayload[];
  /*webSocket =  new WebSocketSubject('ws://localhost:8080/responses');*/
  webSocket = new WebSocket('ws://localhost:8080/responses');
  webSocketObservable = fromEvent(this.webSocket, 'message');

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
    });
    this.subscribeOnWebSocket();
  }

  subscribeOnWebSocket(): void {
    const stompClient = Stomp.over(this.webSocket);
    const destinationPrefix = '/secured/user/' + this.localStorage.retrieve('username');
    stompClient.connect({}, (frame) => {
      stompClient.subscribe(destinationPrefix + '/questionnaire/response', (message => {
        this.responses.push(JSON.parse(message.body));
      }));
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
    });
  }

}
