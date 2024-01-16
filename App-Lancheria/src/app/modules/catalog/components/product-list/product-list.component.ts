import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../../shared/model/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { PromotionService } from '../../../../core/services/promotion.service';
import { Promotion } from '../../../../shared/model/promotion.model';
import { Category } from '../../../../shared/model/category.model';
import { CategoryService } from '../../../../core/services/category.service';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { OrdersService } from 'src/app/core/services/orders-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categorias: Category[] = [];
  produtos: Produto[] = [];
  promocoes: Promotion[] = []; 
  selectedCategoriaId?: number;
  produtoSelecionado?: Produto;
  quantidadeSelecionada: number = 1;
  selectedCategoriaNome?: string;
  itemMaisVendido: string = '';
  frequenciaItens: {[key: string]: number} = {};
  produtosEmPromocaoIds: number[] = [];

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService, 
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private ordersService: OrdersService, 
  ) {}

  ngOnInit() {
    this.loadCategorias();
    this.loadProdutos();
    this.loadPromocoes(); 
    this.obterItemMaisVendido();
  }

  loadCategorias() {
    this.categoryService.getCategorias().subscribe(
      data => this.categorias = data,
      error => console.error(error)
    );
  }

  loadProdutos() {
    this.productService.getProdutos().subscribe(
      data => {
        this.produtos = data;
        this.applyPromotionsToProducts();
      },
      error => console.error(error)
    );
  }

  loadPromocoes() {
    this.promotionService.getPromocoes().subscribe(
      data => {
        this.promocoes = data;
        this.produtosEmPromocaoIds = data
          .flatMap(promocao => promocao.produtosAplicaveis || []);
        this.applyPromotionsToProducts();
      },
      error => console.error(error)
    );
  }

  applyPromotionsToProducts() {
    if (this.promocoes.length > 0 && this.produtos.length > 0) {
      this.produtos = this.produtos.map(produto => {
        return {
          ...produto,
          preco: this.calculateDiscountedPrice(produto)
        };
      });
    }
  }

  calculateDiscountedPrice(produto: Produto): number {
    let discountedPrice = produto.preco;
    this.promocoes.forEach(promocao => {
      if (promocao.produtosAplicaveis && promocao.produtosAplicaveis.includes(produto.id)) {
        discountedPrice *= (1 - promocao.desconto / 100);
      }
    });
    return discountedPrice;
  }

  onCategoriaSelecionada(categoriaNome: string) {
    this.selectedCategoriaNome = categoriaNome;
    this.filterProdutosPorCategoria();
  }
  filterProdutosPorCategoria() {
    if (this.selectedCategoriaNome) {
      this.productService.getProdutos().subscribe(
        data => {
          this.produtos = data.filter(produto => produto.categoria === this.selectedCategoriaNome);
        },
        error => console.error(error)
      );
    } else {
      this.loadProdutos(); // Carrega todos os produtos se nenhuma categoria for selecionada
    }
  }
    

  adicionarAoCarrinho(produto: Produto) {
    const usuarioAtual = this.authService.currentUserValue;
    if (usuarioAtual && usuarioAtual.id) {
      this.cartService.adicionarAoCarrinho(usuarioAtual.id, produto).subscribe(cart => {
        // Lógica de sucesso
      });
    } else {
      // Lógica caso não haja um usuário logado ou se o id não for válido
    }
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
  

}

