import { Injectable } from '@angular/core';

import { Store } from "@ngxs/store";

import { AuthenticationState } from "../store/authentication.state";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store) {
  }

  isAuthenticated(): boolean {
    return this.store.selectSnapshot(AuthenticationState.userToken);
  }
}
