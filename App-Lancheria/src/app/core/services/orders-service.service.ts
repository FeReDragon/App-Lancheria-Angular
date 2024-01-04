import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Order } from 'src/app/shared/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:3000/pedidos'; // URL do seu JSON Server

  constructor(private http: HttpClient) { }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}?usuarioId=${userId}`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  atualizarOrder(orderData: Partial<Order>): Observable<any> {
    if (orderData.id) {
      return this.http.put(`${this.apiUrl}/${orderData.id}`, orderData);
    } else {
      // Retornar um erro se o ID não estiver presente
      return throwError(new Error('ID do pedido não fornecido para atualização'));
    }
  }
}
