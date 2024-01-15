import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service'; // Ajuste o caminho conforme necessário
import { Produto } from '../../../../shared/model/product.model';
@Component({
  selector: 'app-dish-of-the-day',
  templateUrl: './dish-of-the-day.component.html',
  styleUrls: ['./dish-of-the-day.component.scss']
})
export class DishOfTheDayComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.carregarProdutosPratoDoDia();
  }

  carregarProdutosPratoDoDia(): void {
    this.productService.getProdutos().subscribe(
      produtos => this.produtos = produtos.filter(produto => produto.isDishOfTheDay),
      error => console.error(error)
    );
  }
}
 