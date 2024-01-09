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
  itemMaisVendido: string = '';
  frequenciaItens: {[key: string]: number} = {};

  constructor(
    private productService: ProductService,
    private ordersService: OrdersService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.obterTotalProdutos();
    this.obterTotalPedidos();
    this.obterTotalPedidosUltimoDia();
    this.obterItemMaisVendido();
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

  obterItemMaisVendido() {
    this.ordersService.getOrders().subscribe(
      pedidos => {
        pedidos.forEach(pedido => {
          pedido.itens.forEach(item => {
            if (this.frequenciaItens[item.nome]) {
              this.frequenciaItens[item.nome] += item.quantidade;
            } else {
              this.frequenciaItens[item.nome] = item.quantidade;
            }
          });
        });
        this.itemMaisVendido = this.encontrarItemMaisVendido();
      },
      erro => {
        console.error('Erro ao obter pedidos', erro);
      }
    );
  }

  encontrarItemMaisVendido(): string {
    return Object.keys(this.frequenciaItens).reduce((a, b) => this.frequenciaItens[a] > this.frequenciaItens[b] ? a : b);
  }

  navegarParaGerenciamentoProdutos() {
    this.router.navigate(['/adm-itens']);
  }

  navegarParaGerenciamentoPedidios() {
    this.router.navigate(['/gerenciamento-pedidos']);
  }
}
