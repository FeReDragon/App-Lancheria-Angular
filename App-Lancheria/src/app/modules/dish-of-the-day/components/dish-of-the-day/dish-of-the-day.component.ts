import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { Produto } from '../../../../shared/model/product.model';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dish-of-the-day',
  templateUrl: './dish-of-the-day.component.html',
  styleUrls: ['./dish-of-the-day.component.scss']
})
export class DishOfTheDayComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.carregarProdutosPratoDoDia();
  }

  carregarProdutosPratoDoDia(): void {
    this.productService.getProdutos().subscribe(
      produtos => this.produtos = produtos.filter(produto => produto.isDishOfTheDay),
      error => console.error(error)
    );
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
``
