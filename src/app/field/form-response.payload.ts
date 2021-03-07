import {FieldResponsePayload} from './field-response.payload';

export interface FormResponsePayload {
  id: number;
  fields: FieldResponsePayload[];
  userId: number;
}
