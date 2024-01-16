import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { OrdersService } from '../../../../core/services/orders-service.service';
import { Router } from '@angular/router';
import { PromotionService } from 'src/app/core/services/promotion.service';

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
  totalPromocoes: number = 0;
  totalPedidosPendentes: number = 0;
  totalPratosDoDia: number = 0;



  constructor(
    private productService: ProductService,
    private ordersService: OrdersService, 
    private promotionService: PromotionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obterTotalProdutos();
    this.obterTotalPedidos();
    this.obterTotalPedidosUltimoDia();
    this.obterItemMaisVendido();
    this.obterTotalPromocoes();
    this.obterTotalPedidosPendentes();
    this.obterTotalPratosDoDia();

    setInterval(() => {
      this.obterTotalPedidosPendentes();
    }, 20000); // 
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

  obterTotalPromocoes() {
    this.promotionService.getPromocoes().subscribe(
      promocoes => {
        this.totalPromocoes = promocoes.length;
      },
      erro => {
        console.error('Erro ao obter total de promoções', erro);
      }
    );
  }

  obterTotalPedidosPendentes() {
    this.ordersService.getOrders().subscribe(
      pedidos => {
        this.totalPedidosPendentes = pedidos.filter(pedido => pedido.status === 'pendente').length;
      },
      erro => {
        console.error('Erro ao obter total de pedidos pendentes', erro);
      }
    );
  }

  obterTotalPratosDoDia() {
    this.productService.getProdutos().subscribe(
      produtos => {
        this.totalPratosDoDia = produtos.filter(produto => produto.isDishOfTheDay).length;
      },
      erro => {
        console.error('Erro ao obter total de pratos do dia', erro);
      }
    );
  }
  

  encontrarItemMaisVendido(): string {
    return Object.keys(this.frequenciaItens).reduce((a, b) => this.frequenciaItens[a] > this.frequenciaItens[b] ? a : b);
  }
}
