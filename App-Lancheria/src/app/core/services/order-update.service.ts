import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/app/shared/model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderUpdateService {
  private orderUpdateSubject = new BehaviorSubject<{ orderId: number, status: string } | null>(null);
  orderUpdate$: Observable<{ orderId: number, status: string } | null> = this.orderUpdateSubject.asObservable();

  // OrderUpdateService
  emitOrderUpdate(orderId: number, status: string) {
    console.log('Emitindo atualização do pedido:', { orderId, status });
    this.orderUpdateSubject.next({ orderId, status });
  }
}  
