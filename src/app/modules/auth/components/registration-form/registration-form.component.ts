import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth.service';
import { RegexValidator } from '../../../../shered/constants/regex-validators';
import { AddUser } from '../../actions/registration.action';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent {
  registrationForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern((RegexValidator.name))]),
    lastname: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern((RegexValidator.name))]),
    email: new FormControl(null, [Validators.required, Validators.pattern(RegexValidator.email)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)])
  });

  constructor(
    private store: Store,
    public authService: AuthService
  ) { }

  signUp(): void {
    if (this.registrationForm.valid) {
      const user = { id: Date.now(), ...this.registrationForm.getRawValue() };
      this.store
        .dispatch(new AddUser({ user }))
      this.registrationForm.reset();
    }
  }

  signIn(): void {
    this.authService.isExistEmail(false);
    this.store.dispatch(new Navigate(['/auth', 'login']))
  }
}
