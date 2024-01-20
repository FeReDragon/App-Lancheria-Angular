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
  erroLogin: string = '';  // Adicionado para armazenar a mensagem de erro

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.senha).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {
        if (error === 'Credenciais inválidas.') {
          this.erroLogin = 'Falha ao fazer login. Verifique seu e-mail ou senha.';
        } else {
          this.erroLogin = 'Verifique seu e-mail ou senha. Erro ao conectar ao serviço de login.';
        }
      }
    );
  }
}  
