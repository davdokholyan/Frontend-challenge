import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showMenu = false;

  constructor(
    public authService: AuthService
  ) {}

  logOut(): void {
    this.authService.logout();
  }
}
