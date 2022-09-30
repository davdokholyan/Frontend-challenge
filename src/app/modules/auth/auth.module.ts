import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { ErrorMsgComponent } from 'src/app/shared/components';
import { LoginFormComponent, RegistrationFormComponent } from './components';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
