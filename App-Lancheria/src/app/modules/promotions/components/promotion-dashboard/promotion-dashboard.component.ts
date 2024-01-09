import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { PromotionService } from '../../../../core/services/promotion.service';
import { Promotion } from '../../../../shared/model/promotion.model';
import { Produto } from '../../../../shared/model/product.model';

@Component({
  selector: 'app-promotion-dashboard',
  templateUrl: './promotion-dashboard.component.html',
  styleUrls: ['./promotion-dashboard.component.scss']
})
export class PromotionDashboardComponent implements OnInit {
  promocoes: Promotion[] = [];
  produtos: Produto[] = [];
  promocaoForm: FormGroup = new FormGroup({}); // Inicialização direta

  constructor(private promotionService: PromotionService, private productService: ProductService) {}

  ngOnInit() {
    this.promocaoForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      desconto: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      dataInicio: new FormControl('', Validators.required),
      dataFim: new FormControl('', Validators.required),
      produtosAplicaveis: new FormControl([])
    });
    this.carregarPromocoes();
    this.carregarProdutos();
  }

  carregarPromocoes() {
    this.promotionService.getPromocoes().subscribe((data: Promotion[]) => {
      this.promocoes = data;
    });
  }

  carregarProdutos() {
    this.productService.getProdutos().subscribe((data: Produto[]) => {
      this.produtos = data;
    });
  }

  onSubmit() {
    if (this.promocaoForm.valid) {
      const novaPromocao = this.promocaoForm.value as Promotion;
      this.promotionService.adicionarPromocao(novaPromocao).subscribe({
        next: (promocaoAdicionada) => {
          console.log('Promoção adicionada:', promocaoAdicionada);
          this.carregarPromocoes(); // Atualiza a lista de promoções
        },
        error: (erro) => {
          console.error('Erro ao adicionar promoção:', erro);
        }
      });
    }
  }

  editarPromocao(promocao: Promotion) {
    // Implementar lógica de preenchimento do formulário com os dados da promoção para edição
  }

  excluirPromocao(promocaoId: number) {
    // Implementar lógica de exclusão da promoção
  }

  getProdutoNome(produtoId: number): string {
    const produto = this.produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : 'Produto não encontrado';
  }
}
