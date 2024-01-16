import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../../../shared/model/cart.model';
import { Produto } from '../../../../shared/model/product.model'; // Importe o modelo de Produto
import { CartService } from '../../../../core/services/cart.service';
import { ProductService } from '../../../../core/services/product.service'; // Importe o ProductService
import { AuthService } from '../../../../core/services/auth.service';
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

  produtos: Produto[] = []; // Lista de produtos para a modal

  constructor(
    private cartService: CartService, 
    private productService: ProductService, // Injete o ProductService
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    const usuarioAtual = this.authService.currentUserValue; 
    const usuarioId = usuarioAtual ? usuarioAtual.id : null; 

    if (usuarioId) {
      this.cartService.getCart(usuarioId).subscribe(cart => {
        this.cart = cart || this.cart;
      });

      this.productService.getProdutos().subscribe(produtos => {
        this.produtos = produtos;
      });
    }
    // lógica alternativa aqui se usuarioId for null
  }

  removerItem(item: CartItem) {
    const usuarioId = this.authService.currentUserValue ? this.authService.currentUserValue.id : null;
    if (usuarioId) {
      this.cartService.removerItem(usuarioId, item.produtoId).subscribe(cart => {
        this.cart = cart || this.cart;
      });
    }
    // Lógica alternativa para usuarioId null
  }

  adicionarItemAoCarrinho(produto: Produto, quantidade: number = 1) {
    const usuarioId = this.authService.currentUserValue ? this.authService.currentUserValue.id : null;
    if (usuarioId) {
      this.cartService.adicionarAoCarrinho(usuarioId, produto, quantidade).subscribe(cart => {
        this.cart = cart;
        // Feche a modal aqui, se necessário
      });
    }
    // Lógica alternativa para usuarioId null
  }

  calcularTotal() {
    return this.cart.totalPreco;
  }

  finalizarPedido() {
    this.router.navigate(['/pedido']);
  }
}
