// navbar.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.logout();
  }

  isAdmin() {
    return this.currentUser && this.currentUser.tipo === 2;
  }
}

