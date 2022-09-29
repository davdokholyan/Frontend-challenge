import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { AuthRoutingModule } from './auth-routing.module';
import { ErrorMsgComponent } from 'src/app/shered/components';
import { LoginFormComponent, RegistrationFormComponent } from './components';
import { RegistrationState } from './store/registration.state';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent,
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgxsModule.forFeature([RegistrationState])
  ]
})
export class AuthModule { }
