import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../../shared/model/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { Category } from '../../../../shared/model/category.model';
import { CategoryService } from '../../../../core/services/category.service';
import { CartService } from '../../../../core/services/cart.service'; // Importe o CartService

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  categorias: Category[] = [];
  produtos: Produto[] = [];
  selectedCategoriaId?: number;
  produtoSelecionado?: Produto;
  quantidadeSelecionada: number = 1;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService // Injete o CartService
  ) {}

  ngOnInit() {
    this.loadCategorias();
    this.loadProdutos();
  }

  loadCategorias() {
    this.categoryService.getCategorias().subscribe(
      data => this.categorias = data,
      error => console.error(error)
    );
  }

  loadProdutos() {
    if (this.selectedCategoriaId) {
      this.productService.getProdutosPorCategoria(this.selectedCategoriaId).subscribe(
        data => this.produtos = data,
        error => console.error(error)
      );
    } else {
      this.productService.getProdutos().subscribe(
        data => this.produtos = data,
        error => console.error(error)
      );
    }
  }

  onCategoriaSelecionada(id: number) {
    this.selectedCategoriaId = id;
    this.loadProdutos();
  }  

  adicionarAoCarrinho(produto: Produto) {
    const usuarioId = 0; // Substitua pelo ID do usuário real
    this.cartService.adicionarAoCarrinho(usuarioId, produto).subscribe(cart => {
      // Lógica após adicionar ao carrinho, como atualizar a UI
    });
  }

}

