import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/model/category.model'; // Atualize o caminho conforme necessário

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // Outros métodos conforme necessário...
}

