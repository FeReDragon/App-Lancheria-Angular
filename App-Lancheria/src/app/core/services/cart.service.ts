// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, CartItem } from '../../shared/model/cart.model';
import { Produto } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  getCart(usuarioId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${usuarioId}`);
  }

  adicionarAoCarrinho(usuarioId: number, produto: Produto, quantidade: number = 1): Observable<Cart> {
    return this.getCart(usuarioId).pipe(
      map(cart => {
        const itemExistente = cart.itens.find(item => item.produtoId === produto.id);
        if (itemExistente) {
          itemExistente.quantidade += quantidade;
        } else {
          const novoItem: CartItem = {
            produtoId: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: quantidade,
            imagemUrl: produto.imagemUrl
          };
          cart.itens.push(novoItem);
        }
        this.atualizarCarrinho(cart);
        return cart;
      })
    );
  }

  removerItem(usuarioId: number, produtoId: number): Observable<Cart> {
    return this.getCart(usuarioId).pipe(
      map(cart => {
        cart.itens = cart.itens.filter(item => item.produtoId !== produtoId);
        this.atualizarCarrinho(cart);
        return cart;
      })
    );
  }

  private atualizarCarrinho(cart: Cart): void {
    this.http.put<Cart>(`${this.apiUrl}/${cart.usuarioId}`, cart).subscribe();
    cart.totalItens = cart.itens.reduce((total, item) => total + item.quantidade, 0);
    cart.totalPreco = cart.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }
}
