import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { Cart } from '../../../../shared/model/cart.model';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/model/order.model';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {
  cart: Cart = {
    itens: [],
    totalItens: 0,
    totalPreco: 0,
    usuarioId: 0
  };
  bairro: string = '';
  endereco: string = '';
  cidade: string = '';
  cep: string = '';
  metodoPagamento: string = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obterDadosCarrinho();
  }

  obterDadosCarrinho() {
    const usuario = this.authService.currentUserValue;
    if (usuario && usuario.id) {
      this.cartService.getCart(usuario.id).subscribe(cart => {
        this.cart = cart || this.cart; // Se 'cart' for null, mantém o valor inicial
      });
    }
  }

  enviarPedido() {
    const usuarioAtual = this.authService.currentUserValue;
    if (usuarioAtual && typeof usuarioAtual.id === 'number') {
      const totalPedido = this.cart ? this.cart.totalPreco : 0;
    
      const pedido: Order = {
        usuarioId: usuarioAtual.id,
        itens: this.cart ? this.cart.itens : [],
        dataPedido: new Date(),
        status: 'pendente',
        total: totalPedido,
        endereco: this.endereco,
        bairro: this.bairro,
        cidade: this.cidade,
        cep: this.cep,
        metodoPagamento: this.metodoPagamento,
      };
  
      this.ordersService.createOrder(pedido).subscribe({
        next: (res) => {
          // Garantir que o usuarioId é um número antes de chamar limparCarrinho
          if (typeof usuarioAtual.id === 'number') {
            this.cartService.limparCarrinho(usuarioAtual.id).subscribe(() => {
              this.router.navigate(['/sumario']);
            });
          }
        },
        error: (err) => {
          console.error('Erro ao criar pedido:', err);
        }
      });
    } else {
      console.error('Usuário não autenticado');
    }
  }
}  