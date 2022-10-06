import { Injectable } from "@angular/core";

import produce from 'immer';

import { finalize, switchMap, tap } from "rxjs";

import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import * as AuthenticationActions from "../actions/authentication.action";

import { IUser } from "@shared/interfaces/IUser";
import { ITodo } from "@shared/interfaces/ITodo";
import { SortType } from "@shared/constants/sortType";


export class AuthStateModel {
  userToken: string;
  authUsers: IUser[];
  user: IUser;
  sortBy: SortType;
  loading: boolean;
}

const defaults: AuthStateModel = {
  userToken: null,
  authUsers: [],
  user: null,
  sortBy: SortType.A_Z_DATE,
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

  @Selector()
  static todoList({ user }: AuthStateModel): ITodo[] {
    return user.todoList
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
            draft.authUsers.map(user => {
              if (user.id === draft.user.id) {
                user.id = draft.user.id;
                user.email = draft.user.email;
                user.password = draft.user.password;
                user.firstname = draft.user.firstname;
                user.lastname = draft.user.lastname;
                user.todoList = draft.user.todoList;
              }
            })

            draft.userToken = null;
            draft.user = null;
          })
        );
        this.store.dispatch(new Navigate(['/auth', 'login'], null));
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
              draft.user = { todoList: [], ...payload.user };
              draft.authUsers.push(payload.user);
              this.store.dispatch(new AuthenticationActions.SortingBy({ sortBy: draft.sortBy }))
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
              draft.user = { todoList: [], ...existUser };
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

  @Action(AuthenticationActions.AddTodo)
  addTodo(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.AddTodo
  ) {
    return setState(
      produce(getState(), draft => {
        draft.user.todoList.push({ id: Date.now(), ...payload.todo });
        this.store.dispatch(new AuthenticationActions.SortingBy({ sortBy: draft.sortBy }))
      })
    );
  }

  @Action(AuthenticationActions.EditTodo)
  editTodo(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.EditTodo
  ) {
    return setState(
      produce(getState(), draft => {
        draft.user.todoList.map(item => {
          if (item.id === payload.id) {
            item.title = payload.todo.title;
            item.description = payload.todo.description;
            item.date = payload.todo.date;
          }
        });
        this.store.dispatch(new AuthenticationActions.SortingBy({ sortBy: draft.sortBy }))
      })
    );
  }

  @Action(AuthenticationActions.CompleteTodo)
  completeTodo(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.CompleteTodo
  ) {
    return setState(
      produce(getState(), draft => {
        draft.user.todoList.find(item => item.id === payload.id).completed = true;
      })
    );
  }

  @Action(AuthenticationActions.RemoveTodo)
  removeTodo(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.RemoveTodo
  ) {
    return setState(
      produce(getState(), draft => {
        draft.user.todoList = draft.user.todoList.filter(todo => todo.id !== payload.id);
      })
    )
  }

  @Action(AuthenticationActions.SortingBy)
  sortingBy(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: AuthenticationActions.SortingBy
  ) {
    return setState(
      produce(getState(), draft => {
        draft.sortBy = payload.sortBy;
        switch (payload.sortBy) {
          case SortType.A_Z_TITLE:
            draft.user.todoList = draft.user.todoList.sort((a, b) => a.title > b.title ? 1 : -1);
            break;
          case SortType.Z_A_TITLE:
            draft.user.todoList = draft.user.todoList.sort((a, b) => a.title < b.title ? 1 : -1);
            break;
          case SortType.A_Z_DATE:
            draft.user.todoList = draft.user.todoList.sort((a, b) => a.date < b.date ? 1 : -1);
            break;
          case SortType.Z_A_DATE:
            draft.user.todoList = draft.user.todoList.sort((a, b) => a.date > b.date ? 1 : -1);
            break;
        }
      })
    )
  }
}
