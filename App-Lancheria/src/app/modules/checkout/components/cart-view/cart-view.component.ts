import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../../../shared/model/cart.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {
  cart: Cart = {
    itens: [],
    totalItens: 0,
    totalPreco: 0,
    usuarioId: 0
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    const usuarioId = 0; // Substitua pelo ID do usuário real
    this.cartService.getCart(usuarioId).subscribe(cart => {
      this.cart = cart;
    });
  }

  removerItem(item: CartItem) {
    const usuarioId = 0; // Substitua pelo ID do usuário real
    this.cartService.removerItem(usuarioId, item.produtoId).subscribe(cart => {
      this.cart = cart;
    });
  }

  calcularTotal() {
    return this.cart.totalPreco; // Isso deve ser ajustado se você desejar atualizar o total dinamicamente
  }
}
