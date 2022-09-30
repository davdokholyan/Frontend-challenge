import { Injectable } from "@angular/core";

import produce from 'immer';

import { finalize, switchMap, tap } from "rxjs";

import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import * as AuthenticationActions from "../actions/authentication.action";

import { IUser } from "../../shared/interfaces/IUser";


export class AuthStateModel {
  userToken: string;
  authUsers: IUser[];
  user: IUser;
  loading: boolean;
}

const defaults: AuthStateModel = {
  userToken: null,
  authUsers: [],
  user: null,
  loading: false
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthenticationState {

  constructor(
    private store: Store
  ) { }

  @Selector()
  static loading({ loading }: AuthStateModel): boolean {
    return loading;
  }

  @Selector()
  static userToken({ userToken }: AuthStateModel): boolean {
    return !!userToken;
  }

  @Action(AuthenticationActions.StartLoading)
  startLoading(ctx: StateContext<AuthStateModel>) {
    return ctx.patchState({ loading: true });
  }

  @Action(AuthenticationActions.StopLoading)
  stopLoading(ctx: StateContext<AuthStateModel>) {
    return ctx.patchState({ loading: false });
  }

  @Action(AuthenticationActions.LogOut)
  logOut(
    { getState, setState, dispatch }: StateContext<AuthStateModel>
  ) {
    return dispatch(new AuthenticationActions.StartLoading()).pipe(
      tap(() => {
        setState(
          produce(getState(), draft => {
            draft.userToken = null;
          })
        );
        this.store.dispatch(new Navigate(['/auth', 'login']));
      }),
      finalize(() => dispatch(new AuthenticationActions.StopLoading()))
    );
  }

  @Action(AuthenticationActions.AddUser)
  addUser(
    { getState, setState, dispatch }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.AddUser
  ) {
    return dispatch(new AuthenticationActions.StartLoading()).pipe(
      switchMap(() => {
        const state = getState();
        if (state.authUsers.find(item => {
          return item.email === payload.user.email
        })) {
          throw new Error('err_email_must_be_unique');
        } else {
          setState(
            produce(getState(), draft => {
              draft.userToken = payload.user.id;
              draft.authUsers.push(payload.user);
            })
          );
        }
        return this.store.dispatch(new Navigate(['/about-task']));
      }),
      finalize(() => dispatch(new AuthenticationActions.StopLoading()))
    );
  }

  @Action(AuthenticationActions.LoginUser)
  loginUser(
    { getState, setState, dispatch }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.LoginUser
  ) {
    return dispatch(new AuthenticationActions.StartLoading()).pipe(
      switchMap(() => {
        const state = getState();
        const existUser = state.authUsers.find(item => {
          return item.password === payload.user.password && item.email === payload.user.email
        })

        if (existUser) {
          setState(
            produce(getState(), draft => {
              draft.userToken = existUser.id;
            })
          );
        } else {
          throw new Error('err_invalid_credentials');
        }
        return this.store.dispatch(new Navigate(['/about-task']));
      }),
      finalize(() => dispatch(new AuthenticationActions.StopLoading()))
    );
  }
}
