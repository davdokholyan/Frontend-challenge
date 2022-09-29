import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { Navigate } from "@ngxs/router-plugin";
import { BehaviorSubject, Observable } from "rxjs";
import { IUser } from '../shered/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: IUser[] = [];

  private _isAuth$ = new BehaviorSubject(false);
  isAuth$ = this._isAuth$.asObservable();

  private _isExistUser$ = new BehaviorSubject(false);
  isExistUser$ = this._isExistUser$.asObservable();

  private _isExistEmail$ = new BehaviorSubject(false);
  isExistEmail$ = this._isExistEmail$.asObservable();

  constructor(
    private store: Store
  ) {
    const token = localStorage.getItem('id_token');
    this._isAuth$.next(!!token);
  }

  signUp(user: IUser) {
    this.getUsers();
    const existEmail = this.users.find(item => {
      return item.email === user.email
    })

    if (existEmail) {
      this.notAuthorized('registration');
      this.isExistEmail(true);
    } else {
      this.isExistEmail(false);
      this.users.push(user);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem('id_token', user.id);
      this.afterAuthorization();
    }
  }

  login(user: Partial<IUser>): void {
    this.getUsers();
    const existUser = this.users.find(item => {
      return item.password === user.password && item.email === user.email
    })

    if (existUser) {
      this.isExistUser(false);
      localStorage.setItem('id_token', existUser.id);
      this.afterAuthorization();
    } else {
      this.notAuthorized('login');
      this.isExistUser(true);
    }
  }

  logout(): void {
    localStorage.removeItem('id_token');
    this.notAuthorized('login');
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuth$;
  }

  isExistUser(action: boolean): void {
    this._isExistUser$.next(action);
  }

  isExistEmail(action: boolean): void {
    this._isExistEmail$.next(action);
  }

  private getUsers(): void {
    const savedUsers = localStorage.getItem("users");
    this.users = savedUsers ? JSON.parse(savedUsers) : [];
  }

  private afterAuthorization(): void {
    this._isAuth$.next(true);
    this.store.dispatch(new Navigate(['/about-task']));
  }

  private notAuthorized(path: string): void {
    this._isAuth$.next(false);
    this.store.dispatch(new Navigate(['/auth', path]));
  }
}
