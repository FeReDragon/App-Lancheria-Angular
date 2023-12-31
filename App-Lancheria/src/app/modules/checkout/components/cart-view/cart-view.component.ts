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
    totalPreco: 0
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Carrega os itens do carrinho do CartService
    this.cart = this.cartService.getCart();
  }

  removerItem(item: CartItem) {
    // Remove um item do carrinho
    this.cartService.removerItem(item.produtoId);
  }

  calcularTotal() {
    return this.cartService.getCart().totalPreco;
  }
}
