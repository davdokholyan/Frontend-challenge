import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { AuthService } from "src/app/services/auth.service";
import { IUser } from "src/app/shered/interfaces/IUser";
import { AddUser, LoginUser } from "../actions/registration.action";

export class RegistrationStateModel {
  user: IUser;
}

const defaults: RegistrationStateModel = {
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  }
};

@State<RegistrationStateModel>({
  name: 'registration',
  defaults
})
@Injectable()
export class RegistrationState {
  constructor(private authService: AuthService) { }

  @Action(AddUser)
  addUser(
    { dispatch }: StateContext<RegistrationStateModel>,
    { payload }: AddUser
  ) {
    return this.authService
      .signUp(payload.user);
  }

  @Action(LoginUser)
  loginUser(
    { dispatch }: StateContext<RegistrationStateModel>,
    { payload }: LoginUser
  ) {
    return this.authService
      .login(payload.user);
  }
}
