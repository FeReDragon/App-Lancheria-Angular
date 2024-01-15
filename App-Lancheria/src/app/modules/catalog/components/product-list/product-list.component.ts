import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../../shared/model/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { PromotionService } from '../../../../core/services/promotion.service';
import { Promotion } from '../../../../shared/model/promotion.model';
import { Category } from '../../../../shared/model/category.model';
import { CategoryService } from '../../../../core/services/category.service';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';

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

  constructor(
    private productService: ProductService,
    private promotionService: PromotionService, 
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCategorias();
    this.loadProdutos();
    this.loadPromocoes(); 
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
        this.applyPromotionsToProducts(); // Aplicar promoções após carregar
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
  
  

}

