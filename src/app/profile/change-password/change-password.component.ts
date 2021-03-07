import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordPayload} from './change-password.payload';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {ProfileService} from '../shared/profile.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  changePasswordPayload: ChangePasswordPayload;

  constructor(private profileService: ProfileService, private toastr: ToastrService) {
    this.changePasswordForm = new FormGroup({});
    this.changePasswordPayload = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    };
  }

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup( {
      oldPassword: new FormControl('', Validators.required, RxwebValidators.minLengthAsync({value: 5})),
      newPassword: new FormControl('', Validators.required, RxwebValidators.minLengthAsync({value: 5})),
      newPasswordConfirm: new FormControl('', [Validators.required, RxwebValidators.compare({fieldName: 'newPassword'})])
    });
  }

  changePassword(): void {
    this.changePasswordPayload.oldPassword = this.changePasswordForm.get('oldPassword')?.value;
    this.changePasswordPayload.newPassword = this.changePasswordForm.get('newPassword')?.value;
    this.changePasswordPayload.newPasswordConfirm = this.changePasswordForm.get('newPasswordConfirm')?.value;
    this.profileService.changePassword(this.changePasswordPayload).subscribe((data) => {
      this.changePasswordForm.reset();
      this.toastr.success('Password successfully changed!');
    });
  }
}
