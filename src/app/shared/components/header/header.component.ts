import { Component } from '@angular/core';

import { Observable } from "rxjs";

import { Select, Store } from "@ngxs/store";
import { LogOut } from "@core/actions/authentication.action";
import { AuthenticationState } from "@core/store/authentication.state";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Select(AuthenticationState.userToken)
  userToken$: Observable<boolean>;

  showMenu = false;

  constructor(
    private store: Store
  ) { }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
