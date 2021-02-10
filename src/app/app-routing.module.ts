import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {FieldComponent} from './field/field.component';
import {ChangePasswordComponent} from './profile/change-password/change-password.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {ResponseComponent} from './response/response.component';
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {AuthGuard} from './guards/auth.guard';
import {SuccessSubmitPageComponent} from './questionnaire/success-submit-page/success-submit-page.component';
import {ReverseAuthGuard} from './guards/reverse-auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'sign-up', component: SignupComponent, canActivate: [ReverseAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [ReverseAuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'fields', component: FieldComponent, canActivate: [AuthGuard]},
  {path: 'responses', component: ResponseComponent, canActivate: [AuthGuard]},
  {path: 'form/:id/questionnaire', component: QuestionnaireComponent},
  {path: 'success', component: SuccessSubmitPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
