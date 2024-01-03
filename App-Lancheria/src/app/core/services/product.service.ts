// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutosPorCategoria(categoriaId: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}?categoriaId=${categoriaId}`);
  }
  getProdutosPorCategoriaNome(categoriaNome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl + '?categoria=' + categoriaNome);
  }
  

  adicionarProduto(produto: Produto): Observable<Produto> {
    // Garanta que 'categoriaId' está sendo enviado corretamente
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    // Garanta que 'categoriaId' está sendo atualizado corretamente
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  excluirProduto(produtoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${produtoId}`);
  }
}

