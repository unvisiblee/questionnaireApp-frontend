import {ResponseForFieldsResponsePayload} from './responseForFields-response.payload';

export interface ResponseServerResponsePayload {
  id: number;
  formId: number;
  responseForFields: ResponseForFieldsResponsePayload[];
}
