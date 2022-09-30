import { IUser } from "../../shared/interfaces/IUser";

export class StartLoading {
  static readonly type = '[Auth] StartLoading';
}

export class StopLoading {
  static readonly type = '[Auth] StopLoading';
}

export class LogOut {
  static readonly type = '[Auth] LogOut';
}

export class AddUser {
  static readonly type = '[Auth] AddUser';

  constructor(public payload: { user: IUser }) { }
}

export class LoginUser {
  static readonly type = '[Auth] LoginUser';

  constructor(public payload: { user: Partial<IUser> }) { }
}
