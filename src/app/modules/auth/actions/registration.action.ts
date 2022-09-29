import { IUser } from "src/app/shered/interfaces/IUser";

export class AddUser {
    static readonly type = '[Registration] AddUser';

    constructor(public payload: { user: IUser }) {}
}

export class LoginUser {
    static readonly type = '[Registration] LoginUser';

    constructor(public payload: { user: IUser }) {}
}
