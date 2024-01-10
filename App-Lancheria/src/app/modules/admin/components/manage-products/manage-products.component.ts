// manage-products.component.ts
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../../shared/model/product.model';
import { ProductService } from '../../../../core/services/product.service';

declare var bootstrap: any;

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  produtos: Produto[] = [];
  produtoEditando: Produto = this.criarProdutoVazio();
  categorias: any[] = [
    { id: 1, nome: "Lanches", descricao: "Deliciosos lanches para todos os gostos" },
    { id: 2, nome: "Porções", descricao: "Porções generosas e saborosas" },
    { id: 3, nome: "Pizzas", descricao: "As melhores pizzas da cidade" },
    { id: 4, nome: "Sobremesas", descricao: "Opções doces para um final perfeito da refeição" },
    { id: 5, nome: "Saladas", descricao: "Saladas frescas e nutritivas" },
    { id: 6, nome: "Bebidas", descricao: "Bebidas refrescantes e variadas" }
  ];
  
  modalInstance: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.carregarProdutos();
    this.modalInstance = new bootstrap.Modal(document.getElementById('editProductModal'), {
      keyboard: false
    });
  }

  carregarProdutos() {
    this.productService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  iniciarEdicao(produto: Produto) {
    this.produtoEditando = { ...produto };
    this.abrirModal();
  }

  abrirModal() {
    this.modalInstance.show();
  }

  fecharModal() {
    this.modalInstance.hide();
  }

  confirmarExclusao(produtoId: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.excluirProduto(produtoId);
    }
  }

  excluirProduto(produtoId: number) {
    this.productService.excluirProduto(produtoId).subscribe(() => {
      this.carregarProdutos();
    });
  }

  salvarProduto() {
    if (this.produtoEditando && this.produtoEditando.id) {
      this.productService.atualizarProduto(this.produtoEditando).subscribe(() => {
        this.carregarProdutos();
        this.fecharModal();
        this.produtoEditando = this.criarProdutoVazio();
      });
    } else if (this.produtoEditando) {
      this.productService.adicionarProduto(this.produtoEditando).subscribe(() => {
        this.carregarProdutos();
        this.fecharModal();
        this.produtoEditando = this.criarProdutoVazio();
      });
    }
  }

  criarProdutoVazio(): Produto {
    return { id: 0, nome: '', descricao: '', preco: 0, categoria: '', imagemUrl: '' };
  }
}
