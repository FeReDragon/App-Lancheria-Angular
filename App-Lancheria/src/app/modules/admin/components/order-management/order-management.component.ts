import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { UserService } from '../../../../core/services/user.service';
import { Order } from 'src/app/shared/model/order.model';
import { User } from 'src/app/shared/model/user.model';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: any[] = []; // Use 'any[]' para incluir a propriedade 'userName'
  users: User[] = [];

  constructor(
    private ordersService: OrdersService,
    private userService: UserService
  ) {}

  ngOnInit() {
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
      const pedidoAtualizado = { ...pedidoExistente, status: novoStatus };
  
      this.ordersService.atualizarOrder(pedidoAtualizado).subscribe(() => {
        // Atualização bem-sucedida
        // Atualizar a lista de pedidos no frontend
      },
      erro => {
        console.error('Erro ao atualizar o pedido', erro);
      });
    }
  }
}  
