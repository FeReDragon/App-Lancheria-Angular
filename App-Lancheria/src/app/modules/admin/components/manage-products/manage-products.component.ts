// manage-products.component.ts
import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../../shared/model/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  produtos: Produto[] = [];
  produtoEditando: Produto | null = null;
  categorias: any[] = [
    { id: 1, nome: "Lanches", descricao: "Deliciosos lanches para todos os gostos" },
    { id: 2, nome: "Porções", descricao: "Porções generosas e saborosas" },
    { id: 3, nome: "Pizzas", descricao: "As melhores pizzas da cidade" },
    { id: 4, nome: "Sobremesas", descricao: "Opções doces para um final perfeito da refeição" },
    { id: 5, nome: "Saladas", descricao: "Saladas frescas e nutritivas" },
    { id: 6, nome: "Bebidas", descricao: "Bebidas refrescantes e variadas" }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.productService.getProdutos().subscribe(produtos => {
      this.produtos = produtos;
    });
  }

  iniciarEdicao(produto: Produto) {
    this.produtoEditando = {...produto}; // Cria uma cópia do produto para edição
  }

salvarProduto() {
    if (this.produtoEditando) {
      if (this.produtoEditando.id) {
        // Atualizar produto existente
        this.productService.atualizarProduto(this.produtoEditando).subscribe(() => {
          this.carregarProdutos();
          this.produtoEditando = null;
        });
      } else {
        // Adicionar novo produto
        this.productService.adicionarProduto(this.produtoEditando).subscribe(() => {
          this.carregarProdutos();
          this.produtoEditando = null;
        });
      }
    }
  }

  criarProdutoVazio(): Produto {
    return {
      id: 0, // Defina como null ou 0, dependendo de como seu backend lida com novos IDs
      nome: '',
      descricao: '',
      preco: 0,
      categoria: '',
      imagemUrl: ''
    };
  }

  excluirProduto(produtoId: number) {
    this.productService.excluirProduto(produtoId).subscribe(() => {
      this.carregarProdutos();
    });
  }
}