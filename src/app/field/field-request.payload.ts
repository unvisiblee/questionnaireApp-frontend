import {FieldType} from './fieldType';

export interface FieldRequestPayload {
  label: string;
  fieldType: FieldType;
  required: boolean;
  active: boolean;
  formId: number;
  options: string[];
}
