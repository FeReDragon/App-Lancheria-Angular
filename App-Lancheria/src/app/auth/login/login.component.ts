import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';


  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.get<any[]>('http://localhost:3000/usuarios?email=' + this.email + '&senha=' + this.senha)
      .subscribe(usuarios => {
        if (usuarios.length > 0) {
          console.log('Login bem-sucedido', usuarios[0]);
          this.router.navigate(['/home']); // Redireciona para a rota /home
        } else {
          console.error('Falha no login');
          // Aqui você pode adicionar lógica para lidar com falhas no login
        }
      });
  }
}
