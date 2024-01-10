// cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Cart, CartItem } from '../../shared/model/cart.model';
import { Produto } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) {}

  getCart(usuarioId: number): Observable<Cart> {
    return this.http.get<Cart[]>(`${this.apiUrl}?usuarioId=${usuarioId}`).pipe(
      map(carts => carts[0] || null), // Retorna o primeiro carrinho ou null
      catchError(error => {
        return throwError(error);
      })
    );
  }
    

  adicionarAoCarrinho(usuarioId: number, produto: Produto, quantidade: number = 1): Observable<Cart> {
    return this.getCart(usuarioId).pipe(
      switchMap(cart => {
        if (!cart) {
          // Cria um novo carrinho se não existir
          const novoCarrinho: Cart = {
            usuarioId: usuarioId,
            itens: [],
            totalItens: 0,
            totalPreco: 0
          };
          return this.criarCarrinho(novoCarrinho).pipe(
            switchMap(novoCart => this.adicionarItemAoCarrinho(novoCart, produto, quantidade))
          );
        } else {
          // Adiciona o item ao carrinho existente
          return this.adicionarItemAoCarrinho(cart, produto, quantidade);
        }
      })
    );
  }
  
  private atualizarCarrinho(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${cart.usuarioId}`, cart).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  removerItem(usuarioId: number, produtoId: number): Observable<Cart> {
    return this.getCart(usuarioId).pipe(
      switchMap(cart => {
        if (!cart) {
          return throwError('Carrinho não encontrado.');
        }
  
        // Remover o item do array de itens do carrinho
        cart.itens = cart.itens.filter(item => item.produtoId !== produtoId);
  
        // Atualizar totalItens e totalPreco
        cart.totalItens = cart.itens.reduce((total, item) => total + item.quantidade, 0);
        cart.totalPreco = cart.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  
        // Atualizar o carrinho no servidor
        return this.atualizarCarrinho(cart);
      })
    );
  }
  


  private adicionarItemAoCarrinho(cart: Cart, produto: Produto, quantidade: number): Observable<Cart> {
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
    cart.totalItens = cart.itens.reduce((total, item) => total + item.quantidade, 0);
    cart.totalPreco = cart.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  
    return this.atualizarCarrinho(cart);
  }
  
  private criarCarrinho(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }


  limparCarrinho(usuarioId: number): Observable<any> {
    // Atualiza o carrinho para vazio para o usuário
    const carrinhoVazio: Cart = {
      usuarioId: usuarioId,
      itens: [],
      totalItens: 0,
      totalPreco: 0
    };
    return this.atualizarCarrinho(carrinhoVazio);
  }
}