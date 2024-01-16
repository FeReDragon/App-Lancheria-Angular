import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service'; // Ajuste o caminho conforme necessário
import { Produto } from '../../../../shared/model/product.model';

@Component({
  selector: 'app-manage-dish-of-the-day',
  templateUrl: './manage-dish-of-the-day.component.html',
  styleUrls: ['./manage-dish-of-the-day.component.scss']
})
export class ManageDishOfTheDayComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.productService.getProdutos().subscribe(
      produtos => {
        this.produtos = produtos;
        // Aqui você pode filtrar ou manipular os produtos conforme necessário
      },
      error => {
        // Tratar erros
      }
    );
  }

  marcarPrato(produtoId: number): void {
    this.productService.marcarComoPratoDoDia(produtoId).subscribe(
      () => this.carregarProdutos(),
      error => console.error(error)
    );
  }
  
  desmarcarPrato(produtoId: number): void {
    this.productService.desmarcarComoPratoDoDia(produtoId).subscribe(
      () => this.carregarProdutos(),
      error => console.error(error)
    );
  }
  
}