import {ResponseForFieldsRequestPayload} from './responseForFields-request.payload';

export interface ResponseRequestPayload {
  formId: number;
  responseForFields: ResponseForFieldsRequestPayload[];
}
