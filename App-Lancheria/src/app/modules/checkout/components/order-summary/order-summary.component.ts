import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { Order } from '../../../../shared/model/order.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  pedidos: Order[] = [];

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    const usuario = this.authService.currentUserValue;
    if (usuario && usuario.id) {
      this.ordersService.getOrdersByUserId(usuario.id).subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    }
  }
}

