import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { Order } from '../../../../shared/model/order.model';
import { OrderUpdateService } from 'src/app/core/services/order-update.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  pedidos: Order[] = [];
  private updateSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private orderUpdateService: OrderUpdateService
  ) {}

  ngOnInit() {
    this.carregarPedidosInicialmente();

    // Atualiza os pedidos a cada 30 segundos
    this.updateSubscription = interval(30000)
      .pipe(
        switchMap(() => {
          const usuario = this.authService.currentUserValue;
          return usuario && usuario.id 
            ? this.ordersService.getOrdersByUserId(usuario.id) 
            : [];
        })
      )
      .subscribe(pedidos => {
        this.pedidos = pedidos;
      });

    this.orderUpdateService.orderUpdate$.subscribe(update => {
      if (update) {
        this.atualizarStatusPedido(update.orderId, update.status);
      }
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private carregarPedidosInicialmente() {
    const usuario = this.authService.currentUserValue;
    if (usuario && usuario.id) {
      this.ordersService.getOrdersByUserId(usuario.id).subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    }
  }

  private atualizarStatusPedido(orderId: number, novoStatus: string) {
    const pedidoIndex = this.pedidos.findIndex(pedido => pedido.id === orderId);
    if (pedidoIndex > -1) {
      this.pedidos[pedidoIndex].status = novoStatus;
    }
  }
}
