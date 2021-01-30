import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {SignupRequestPayload} from './signup-request.payload';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({});
    this.signupRequestPayload = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    };
  }



  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required, RxwebValidators.minLengthAsync({value: 3})),
      email: new FormControl('', [Validators.required, RxwebValidators.email()]),
      password: new FormControl('', Validators.required, RxwebValidators.minLengthAsync({value: 5})),
      passwordConfirm: new FormControl('', [Validators.required, RxwebValidators.compare({fieldName: 'password'})]),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phoneNumber: new FormControl(''),
    });
  }

  signup(): void {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    this.signupRequestPayload.passwordConfirm = this.signupForm.get('passwordConfirm')?.value;
    this.signupRequestPayload.firstName = this.signupForm.get('firstName')?.value;
    this.signupRequestPayload.lastName = this.signupForm.get('lastName')?.value;
    this.signupRequestPayload.phoneNumber = this.signupForm.get('phoneNumber')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => { console.log(data); });
  }

}
