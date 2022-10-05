import { NgModule } from '@angular/core';

import { SharedModule } from "@shared/shared.module";
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent, RegistrationFormComponent } from './components';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
