import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/user.model'; 

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
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      tipo: 1 // ou outro valor padrão conforme necessário
    };
  
    constructor(private http: HttpClient) {}
  
    onSubmit() {
      // Enviar dados para o JSON Server
      this.http.post('http://localhost:3000/usuarios', this.user)
        .subscribe(result => {
          console.log('Usuário registrado:', result);
          // Adicione qualquer lógica adicional após o registro aqui
        });
    }
  }
