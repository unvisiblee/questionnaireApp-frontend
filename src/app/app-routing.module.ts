import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {FieldComponent} from './field/field.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {ResponseComponent} from './response/response.component';

const routes: Routes = [
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'fields', component: FieldComponent},
  {path: 'responses', component: ResponseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
