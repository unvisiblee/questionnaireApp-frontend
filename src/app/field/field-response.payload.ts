import {FieldType} from './fieldType';

export interface FieldResponsePayload {
  id: number;
  label: string;
  fieldType: FieldType;
  required: boolean;
  active: boolean;
  options: string[];
}
