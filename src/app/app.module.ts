import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {timeout} from 'rxjs/operators';
import { FormComponent } from './form/form.component';
import { FieldComponent } from './field/field.component';
import { ResponseComponent } from './response/response.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TokenInterceptor} from './token-interceptor';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    FormComponent,
    FieldComponent,
    ResponseComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    QuestionnaireComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true, timeOut: 2500, toastClass: 'alert',
      iconClasses: {
        error: 'alert-danger',
        info: 'alert-info',
        success: 'alert-success',
        warning: 'alert-warning'
      }
    }),
    NgbModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
