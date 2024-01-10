import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../../../shared/model/cart.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service'; // Importe o AuthService
import { Router } from '@angular/router';

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

  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {} // Injete o AuthService

  ngOnInit() {
    const usuarioAtual = this.authService.currentUserValue; 
    const usuarioId = usuarioAtual ? usuarioAtual.id : null; 

    if (usuarioId) {
      this.cartService.getCart(usuarioId).subscribe(cart => {
        this.cart = cart || this.cart; // Se 'cart' for null, mantém o valor inicial
      });
    }
    // lógica alternativa aqui se usuarioId for null
  }

  removerItem(item: CartItem) {
    // Esta função também precisa do ID do usuário autenticado
    const usuarioId = this.authService.currentUserValue ? this.authService.currentUserValue.id : null;

    if (usuarioId) {
      this.cartService.removerItem(usuarioId, item.produtoId).subscribe(cart => {
        this.cart = cart || this.cart; // Se 'cart' for null, mantém o valor inicial
      });
    }
    // Adicione lógica alternativa aqui se usuarioId for null
  }

  calcularTotal() {
    return this.cart.totalPreco;
  }

  finalizarPedido() {
    this.router.navigate(['/pedido']); // Navega para a rota do OrderCreateComponent
  }
}
