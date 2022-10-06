import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

import { Observable } from "rxjs";

import { Select, Store } from "@ngxs/store";
import { LoginUser } from "@core/actions/authentication.action";
import { AuthenticationState } from "@core/store/authentication.state";

import { StatusCode } from "@shared/constants/status-code";
import { RegexValidator } from '@shared/constants/regex-validators';
import { ILoginForm } from "@shared/interfaces/IForms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Select(AuthenticationState.loading)
  loading$: Observable<boolean>;

  loginForm: FormGroup = new FormGroup<ILoginForm>({
    email: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.email)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)])
  });

  constructor(
    private store: Store
  ) { }

  logIn(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.getRawValue();
      this.store
        .dispatch(new LoginUser({ user })).subscribe({
          next: () => this.loginForm.reset(),
          error: err => this.errorHandle(err)
        })
    }
  }

  private errorHandle(error: HttpErrorResponse): void {
    if (error.message === StatusCode.USER_NOT_FOUND) {
      this.loginForm.get('password').setErrors({ notFound: true });
    }
  }
}
