import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FieldService} from '../shared/field.service';
import {FormService} from '../shared/form.service';
import {FormResponsePayload} from '../field/form-response.payload';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  id: number;
  formToAnswer: FormResponsePayload;
  questionnaireFormGroup: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, private formService: FormService, private formBuilder: FormBuilder) {
    this.id = 0;
    this.formToAnswer = {
      id: 0,
      fields: [],
      userId: 0
    };
    this.questionnaireFormGroup = this.formBuilder.group({
      questionnaire: this.formBuilder.array([])
    });
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
      this.questionnaireForm.push(newFormControl);
    });
    console.log(this.questionnaireForm.controls);
  }


  get questionnaireForm(): FormArray {
    return this.questionnaireFormGroup.get('questionnaire') as FormArray;
  }

  saveAnswer(): void {
    this.questionnaireForm.controls.forEach((control) => console.log(control.value));
  }
}
