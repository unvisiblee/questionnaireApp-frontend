import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../shared/profile.service';
import {AuthService} from '../../auth/shared/auth.service';
import {UserResponsePayload} from './user-response.payload';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {waitForAsync} from '@angular/core/testing';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userInfo: UserResponsePayload;
  editProfileForm: FormGroup;

  constructor(private authService: AuthService, private profileService: ProfileService, private router: Router,
              private toastr: ToastrService) {
    this.editProfileForm = new FormGroup({
      email: new FormControl('', [Validators.required, RxwebValidators.email()]),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
    });
    this.userInfo = {
      id: 0,
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    };
  }

   ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const username = this.authService.getUsername();
    if (username === null) {
      throw new Error('username is null');
    }
    this.profileService.getUserInfoByUsername(username).subscribe(data => {
      this.userInfo = data;
      console.log(this.userInfo);
      this.editProfileForm.patchValue(this.userInfo);
    });
  }

  updateUserInfo(): void {
    this.userInfo.email = this.editProfileForm.get('email')?.value;
    this.userInfo.firstName = this.editProfileForm.get('firstName')?.value;
    this.userInfo.lastName = this.editProfileForm.get('lastName')?.value;
    this.userInfo.phoneNumber = this.editProfileForm.get('phoneNumber')?.value;

    this.profileService.updateUser(this.userInfo).subscribe(data => {
      this.editProfileForm.patchValue(data);
      this.toastr.success('Successfully updated your profile!');
    });
  }

}
