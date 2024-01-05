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
  private updateSubscription?: Subscription; // Declaração opcional

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
      .subscribe(orders => {
        this.orders = orders.map(order => ({
          ...order,
          userName: this.users.find(user => user.id === order.usuarioId)?.nome || 'Desconhecido'
        }));
      });
  }

  ngOnDestroy() {
    // Cancelar a inscrição para evitar vazamentos de memória
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
        return orders.map(order => ({
          ...order,
          userName: users.find(user => user.id === order.usuarioId)?.nome || 'Desconhecido'
        }));
      })
    ).subscribe(ordersWithUserName => {
      this.orders = ordersWithUserName;
    });
  }

  atualizarStatus(orderId: number, novoStatus: string) {
    const pedidoExistente = this.orders.find(order => order.id === orderId);
    if (pedidoExistente) {
      // Criar uma nova variável pedidoAtualizado
      const pedidoAtualizado: Partial<Order> = {
        ...pedidoExistente,
        status: novoStatus
      };

      // Agora use pedidoAtualizado na chamada do serviço
      this.ordersService.atualizarOrder(pedidoAtualizado as Order).subscribe(() => {
        // Emitir atualização
        this.orderUpdateService.emitOrderUpdate(orderId, novoStatus);
        // Atualizar a lista de pedidos no frontend
      },
      erro => {
        console.error('Erro ao atualizar o pedido', erro);
      });
    }
  }
}
