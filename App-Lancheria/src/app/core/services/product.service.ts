import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
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
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizarProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  excluirProduto(produtoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${produtoId}`);
  }

  marcarComoPratoDoDia(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${produtoId}`).pipe(
      switchMap(produto => {
        produto.isDishOfTheDay = true;
        return this.http.put<Produto>(`${this.apiUrl}/${produtoId}`, produto);
      })
    );
  }

  desmarcarComoPratoDoDia(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${produtoId}`).pipe(
      switchMap(produto => {
        produto.isDishOfTheDay = false;
        return this.http.put<Produto>(`${this.apiUrl}/${produtoId}`, produto);
      })
    );
  }
}

