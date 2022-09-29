import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { LoginUser } from "../../actions/registration.action";
import { RegexValidator } from '../../../../shered/constants/regex-validators';
import { AuthService } from "src/app/services/auth.service";
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.email)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)])
  });

  constructor(
    private store: Store,
    public authService: AuthService
  ) { }

  logIn(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.getRawValue();
      this.store
        .dispatch(new LoginUser({ user }))
      this.loginForm.reset();
    }
  }

  createUser(): void {
    this.authService.isExistUser(false);
    this.store.dispatch(new Navigate(['/auth', 'registration']));
  }

}
