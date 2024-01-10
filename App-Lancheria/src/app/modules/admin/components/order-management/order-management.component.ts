import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { UserService } from '../../../../core/services/user.service';
import { Order } from 'src/app/shared/model/order.model';
import { User } from 'src/app/shared/model/user.model';
import { forkJoin, interval, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { OrderUpdateService } from 'src/app/core/services/order-update.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  users: User[] = [];
  private updateSubscription?: Subscription;

  constructor(
    private ordersService: OrdersService,
    private userService: UserService,
    private orderUpdateService: OrderUpdateService
  ) {}

  ngOnInit() {
    this.loadOrders();

    // Atualiza os pedidos a cada 30 segundos
    this.updateSubscription = interval(30000)
      .pipe(switchMap(() => this.ordersService.getOrders()))
      .subscribe(newOrders => {
        newOrders.forEach(newOrder => {
          const existingOrderIndex = this.orders.findIndex(order => order.id === newOrder.id);
          if (existingOrderIndex !== -1) {
            // Atualiza o pedido existente
            this.orders[existingOrderIndex] = {
              ...newOrder,
              userName: this.users.find(user => user.id === newOrder.usuarioId)?.nome || 'Desconhecido'
            };
          } else {
            // Adiciona o novo pedido no topo da lista
            this.orders.unshift({
              ...newOrder,
              userName: this.users.find(user => user.id === newOrder.usuarioId)?.nome || 'Desconhecido'
            });
          }
        });
      });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private loadOrders() {
    forkJoin({
      orders: this.ordersService.getOrders(),
      users: this.userService.getUsers()
    }).pipe(
      map(({ orders, users }) => {
        this.users = users;
        return orders
          .map(order => ({
            ...order,
            userName: users.find(user => user.id === order.usuarioId)?.nome || 'Desconhecido'
          }))
          .sort((a, b) => new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime());
      })
    ).subscribe(ordersWithUserName => {
      this.orders = ordersWithUserName;
    });
  }

  atualizarStatus(orderId: number, novoStatus: string) {
    const pedidoExistente = this.orders.find(order => order.id === orderId);
    if (pedidoExistente) {
      const pedidoAtualizado: Partial<Order> = {
        ...pedidoExistente,
        status: novoStatus
      };

      this.ordersService.atualizarOrder(pedidoAtualizado as Order).subscribe(() => {
        this.orderUpdateService.emitOrderUpdate(orderId, novoStatus);
      }, erro => {
        console.error('Erro ao atualizar o pedido', erro);
      });
    }
  }
}
