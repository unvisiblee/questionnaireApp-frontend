import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormResponsePayload} from './form-response.payload';
import {FieldService} from '../shared/field.service';
import {LocalStorageService} from 'ngx-webstorage';
import {FieldType} from './fieldType';
import {FieldResponsePayload} from './field-response.payload';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {FieldRequestPayload} from './field-request.payload';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  form: FormResponsePayload;
  fieldToEdit: FieldResponsePayload;
  editFieldForm: FormGroup;
  fieldToCreate: FieldRequestPayload;

  constructor(private fieldService: FieldService, private localStorage: LocalStorageService,
              private ngbModal: NgbModal) {
    this.fieldToCreate = {
      label: '',
      required: false,
      active: false,
      fieldType: FieldType.SINGLE_LINE_TEXT,
      formId: 0,
      options: []
    };

    this.form = {
      id: 0,
      fields: [],
      userId: 0,
    };

    this.fieldToEdit = {
      id: 0,
      options: [],
      label: '',
      required: false,
      formId: 0,
      active: false,
      fieldType: FieldType.SINGLE_LINE_TEXT,
    };

    this.editFieldForm = new FormGroup({
      label: new FormControl('', [Validators.required]),
      fieldType: new FormControl('', [Validators.required]),
      options: new FormControl(),
      required: new FormControl(),
      active: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields(): void {
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

  editField(content: TemplateRef<any>, field: FieldResponsePayload): void {
    this.fieldToEdit = field;
    const modalRef = this.ngbModal.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    this.editFieldForm.patchValue(field);
    this.editFieldForm.get('options')?.patchValue(this.editFieldForm.get('options')?.value.toString().replaceAll(',', '\n'));
    modalRef.result.then(
      (save) => {
        console.log('save');
        this.fieldToEdit.label = this.editFieldForm.get('label')?.value;
        this.fieldToEdit.fieldType = this.editFieldForm.get('fieldType')?.value;
        this.fieldToEdit.required = this.editFieldForm.get('required')?.value;
        this.fieldToEdit.active = this.editFieldForm.get('active')?.value;
        const options = this.editFieldForm.get('options')?.value + '';
        if (options !== null && options !== undefined) {
          this.fieldToEdit.options = options.split('\n');
        }
        this.fieldService.updateField(this.fieldToEdit).subscribe((data) => {
          this.loadFields();
        });
        },
      (crossClick) => { console.log('cross'); }
      );
  }

  createField(content: TemplateRef<any>): void {
    const modalRef = this.ngbModal.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'});
    // @ts-ignore
    document.getElementById('modal-basic-title').innerHTML = 'Create field';
    this.editFieldForm.reset();
    modalRef.result.then(
      (save) => {
        this.fieldToCreate.label = this.editFieldForm.get('label')?.value;
        this.fieldToCreate.fieldType = this.editFieldForm.get('fieldType')?.value;
        this.fieldToCreate.required = this.editFieldForm.get('required')?.value;
        this.fieldToCreate.active = this.editFieldForm.get('active')?.value;
        const options = this.editFieldForm.get('options')?.value;
        if (options !== null) {
          this.fieldToCreate.options = options.split('\n');
        }
        this.fieldToCreate.formId = this.form.id;
        this.fieldService.createField(this.fieldToCreate).subscribe((data) => {
          console.log('created');
          this.loadFields();
        });
      }
    );
  }

  deleteField(fieldId: number): void {
    this.fieldService.deleteField(fieldId).subscribe((data) => {
      this.loadFields();
    });
  }

}
