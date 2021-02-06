import { Component, OnInit } from '@angular/core';
import {FormResponsePayload} from './form-response.payload';
import {FieldService} from '../shared/field.service';
import {LocalStorageService} from 'ngx-webstorage';
import {FieldType} from './fieldType';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  form: FormResponsePayload;

  constructor(private fieldService: FieldService, private localStorage: LocalStorageService) {
    this.form = {
      id: 0,
      fields: [],
      userId: 0,
    };
  }

  ngOnInit(): void {
    const userId = JSON.parse(this.localStorage.retrieve('userdetails')).id;
    this.fieldService.getFormByUserId(userId).subscribe(data =>
    {
      this.form = data;
      console.log(data);
    });
  }

  getFieldTypeByEnum(fieldType: FieldType): string {
    // todo
    return fieldType;
  }

}
