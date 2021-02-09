import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FieldService} from '../shared/field.service';
import {FormService} from '../shared/form.service';
import {FormResponsePayload} from '../field/form-response.payload';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResponseRequestPayload} from './response-request.payload';
import {ResponseService} from '../shared/response.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  id: number;
  formToAnswer: FormResponsePayload;
  questionnaireFormGroup: FormGroup;
  responseToSave: ResponseRequestPayload;
  constructor(private activatedRoute: ActivatedRoute, private formService: FormService, private formBuilder: FormBuilder,
              private responseService: ResponseService) {
    this.id = 0;
    this.formToAnswer = {
      id: 0,
      fields: [],
      userId: 0
    };
    this.questionnaireFormGroup = this.formBuilder.group({
      questionnaire: this.formBuilder.array([])
    });
    this.responseToSave = {
      formId: 0,
      responseForFields: []
    };
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.formService.getFormById(this.id).subscribe((data) => {
      this.formToAnswer = data;

      this.questionnaireFormGroup = this.formBuilder.group({
        questionnaire: this.formBuilder.array([])
      });
      this.initializeFormControls();
      this.questionnaireFormGroup.reset();
      console.log(this.formToAnswer);
    });
  }

  initializeFormControls(): void {
    this.formToAnswer.fields.forEach((field) => {
      const newFormControl = this.formBuilder.control({});
      if (field.required) {
        newFormControl.setValidators([Validators.required]);
      }
      if (field.active) {
        this.questionnaireForm.push(newFormControl);
      }
    });
    console.log(this.questionnaireForm.controls);
  }


  get questionnaireForm(): FormArray {
    return this.questionnaireFormGroup.get('questionnaire') as FormArray;
  }

  saveAnswer(): void {
    if (this.questionnaireFormGroup.invalid) {
      console.log('invalid');
      return;
    }
    this.responseToSave.formId = this.formToAnswer.id;
    this.responseToSave.responseForFields = [];

    this.questionnaireForm.controls.forEach((control, index) => {

      this.responseToSave.responseForFields.push({
        fieldId: this.formToAnswer.fields[index].id,
        content: control.value,
      });
      console.log(this.responseToSave);
      console.log(control.value);
    });

    this.responseService.createResponse(this.responseToSave).subscribe((data) => console.log(data));
    console.log('saved');

  }
}
