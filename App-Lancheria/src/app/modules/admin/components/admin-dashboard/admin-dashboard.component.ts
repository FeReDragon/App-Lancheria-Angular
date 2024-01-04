import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalProdutos: number = 0;
  totalPedidos: number = 0;
  totalPedidosUltimoDia: number = 0;

  constructor(
    private productService: ProductService,
    private ordersService: OrdersService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.obterTotalProdutos();
    this.obterTotalPedidos();
    this.obterTotalPedidosUltimoDia();
  }

  obterTotalProdutos() {
    this.productService.getProdutos().subscribe(
      produtos => {
        this.totalProdutos = produtos.length;
      },
      erro => {
        console.error('Erro ao obter total de produtos', erro);
      }
    );
  }
  obterTotalPedidos() {
    this.ordersService.getOrders().subscribe(
      pedidos => {
        this.totalPedidos = pedidos.length;
      },
      erro => {
        console.error('Erro ao obter total de pedidos', erro);
      }
    );
  }

  obterTotalPedidosUltimoDia() {
    const dataOntem = new Date();
    dataOntem.setDate(dataOntem.getDate() - 1);

    this.ordersService.getOrders().subscribe(
      pedidos => {
        this.totalPedidosUltimoDia = pedidos.filter(pedido => 
          new Date(pedido.dataPedido) > dataOntem
        ).length;
      },
      erro => {
        console.error('Erro ao obter total de pedidos no último dia', erro);
      }
    );
  }

  // Métodos obterTotalPedidos() e obterTotalPedidosUltimoDia() permanecem iguais

  navegarParaGerenciamentoProdutos() {
    // Substitua pelo caminho correto
    this.router.navigate(['/adm-itens']);
  }

}