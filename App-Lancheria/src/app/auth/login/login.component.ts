import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.senha).subscribe(
      data => {
        this.router.navigate(['/home']); // Redireciona para a rota /home
      },
      error => {
        console.error('Falha no login');
        // Tratamento de erro
      }
    );
  }
}
