import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from "@angular/common/http";

import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { AddUser } from "@core/actions/authentication.action";
import { AuthenticationState } from '@core/store/authentication.state';

import { RegexValidator } from '@shared/constants/regex-validators';
import { StatusCode } from "@shared/constants/status-code";


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  @Select(AuthenticationState.loading)
  loading$: Observable<AuthenticationState>;

  registrationForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern((RegexValidator.name))]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern((RegexValidator.name))]),
    email: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.email)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)])
  });

  constructor(
    private store: Store
  ) { }

  signUp(): void {
    if (this.registrationForm.valid) {
      const user = { id: Date.now(), ...this.registrationForm.getRawValue() };
      this.store
        .dispatch(new AddUser({ user })).subscribe({
          next: () => this.registrationForm.reset(),
          error: err => this.errorHandle(err)
        })
    }
  }

  private errorHandle(error: HttpErrorResponse): void {
    if (error.message === StatusCode.EMAIL_MUST_BE_UNIQUE) {
      this.registrationForm.get('email').setErrors({ emailExists: true });
    }
  }
}
