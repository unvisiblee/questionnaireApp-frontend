import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginResponsePayload} from './login-response.payload';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ProfileService} from '../../profile/shared/profile.service';
import {timeout} from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequestPayload: LoginRequestPayload;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router,
              private profileService: ProfileService, private localStorage: LocalStorageService) {
    this.loginRequestPayload = {
      password: '',
      username: ''
    };

    this.loginForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // tslint:disable-next-line:typedef
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      console.log('Login successful');
      this.profileService.getUserInfoByUsername(this.loginForm.get('username')?.value).subscribe(info => {
        this.localStorage.store('userdetails', JSON.stringify(info));
        this.router.navigateByUrl('fields');
      });
    }, error => {
      this.toastr.error('Failed to log in.\n' +
        'Please make sure that you have entered your login and password correctly.');
    });
  }

}
