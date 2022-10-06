import { SortType } from "@shared/constants/sortType";
import { ITodo } from "@shared/interfaces/ITodo";
import { IUser } from "@shared/interfaces/IUser";

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

export class AddTodo {
  static readonly type = '[Auth] AddTodo';

  constructor(public payload: { todo: ITodo }) { }
}
export class EditTodo {
  static readonly type = '[Auth] EditTodo';

  constructor(public payload: { todo: ITodo, id: string }) { }
}

export class CompleteTodo {
  static readonly type = '[Auth] CompleteTodo';

  constructor(public payload: { id: string }) { }
}

export class RemoveTodo {
  static readonly type = '[Auth] RemoveTodo';

  constructor(public payload: { id: string }) { }
}

export class SortingBy {
  static readonly type = '[Auth] SortingBy';

  constructor(public payload: { sortBy: SortType }) { }
}
