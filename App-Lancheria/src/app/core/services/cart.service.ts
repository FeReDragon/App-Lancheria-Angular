// cart.service.ts
import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../../shared/model/cart.model';
import { Produto } from '../../shared/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = {
    itens: [],
    totalItens: 0,
    totalPreco: 0
  };

  constructor() {}

  getCart(): Cart {
    return this.cart;
  }

  adicionarAoCarrinho(produto: Produto, quantidade: number = 1) {
    const itemExistente = this.cart.itens.find(item => item.produtoId === produto.id);
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
      this.cart.itens.push(novoItem);
    }
    this.atualizarCarrinho();
  }

  removerItem(produtoId: number) {
    this.cart.itens = this.cart.itens.filter(item => item.produtoId !== produtoId);
    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    this.cart.totalItens = this.cart.itens.reduce((total, item) => total + item.quantidade, 0);
    this.cart.totalPreco = this.cart.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }
}
