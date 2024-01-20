import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/user.model';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    user: User = {
      nome: '',
      email: '',
      telefone: '',
      senha: '',
      tipo: 1
    };
    confirmarSenha: string = '';
    sucessoRegistro: boolean = false;  // Variável para controle da mensagem de sucesso

    constructor(private http: HttpClient, private router: Router) {}  // Injetar o Router

    onSubmit() {
      this.http.post('http://localhost:3000/usuarios', this.user).subscribe(result => {
        console.log('Usuário registrado:', result);
        this.sucessoRegistro = true;  // Definir o sucesso do registro como verdadeiro
        setTimeout(() => {
          this.router.navigate(['/login']);  // Redirecionar para /login após 2 segundos
        }, 2000);
      });
    }
}
