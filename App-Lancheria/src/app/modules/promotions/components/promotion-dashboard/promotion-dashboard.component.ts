import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { PromotionService } from '../../../../core/services/promotion.service';
import { Promotion } from '../../../../shared/model/promotion.model';
import { Produto } from '../../../../shared/model/product.model';

declare const bootstrap: any; // Adicione isso se estiver usando Bootstrap 5

@Component({
  selector: 'app-promotion-dashboard',
  templateUrl: './promotion-dashboard.component.html',
  styleUrls: ['./promotion-dashboard.component.scss']
})
export class PromotionDashboardComponent implements OnInit {
  promocoes: Promotion[] = [];
  produtos: Produto[] = [];
  promocaoForm: FormGroup;
  editingPromocaoId: number | null = null;

  constructor(private promotionService: PromotionService, private productService: ProductService) {
    this.promocaoForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      desconto: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      produtosAplicaveis: new FormArray([])
    });
  }

  ngOnInit() {
    this.carregarPromocoes();
    this.carregarProdutos();
  
    const modalElement = document.getElementById('promocaoModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.resetForm();
      });
    }
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
      const promocao = this.promocaoForm.value as Promotion;
      promocao.produtosAplicaveis = (this.promocaoForm.get('produtosAplicaveis') as FormArray).value;

      if (this.editingPromocaoId) {
        promocao.id = this.editingPromocaoId;
        this.promotionService.atualizarPromocao(promocao).subscribe({
          next: (promocaoAtualizada) => {
            console.log('Promoção atualizada:', promocaoAtualizada);
            this.resetForm();
          },
          error: (erro) => console.error('Erro ao atualizar promoção:', erro)
        });
      } else {
        this.promotionService.adicionarPromocao(promocao).subscribe({
          next: (promocaoAdicionada) => {
            console.log('Promoção adicionada:', promocaoAdicionada);
            this.resetForm();
          },
          error: (erro) => console.error('Erro ao adicionar promoção:', erro)
        });
      }
    }
  }

  resetForm() {
    this.promocaoForm.reset();
    (this.promocaoForm.get('produtosAplicaveis') as FormArray).clear();
    this.editingPromocaoId = null;
    this.closeModal();
    this.carregarPromocoes();
  }

  editarPromocao(promocao: Promotion) {
    this.promocaoForm.patchValue({
      titulo: promocao.titulo,
      desconto: promocao.desconto,
      // dataInicio: promocao.dataInicio,
      // dataFim: promocao.dataFim
    });

    const produtosAplicaveisArray = (this.promocaoForm.get('produtosAplicaveis') as FormArray);
    produtosAplicaveisArray.clear();
    (promocao.produtosAplicaveis ?? []).forEach(produtoId => {
      produtosAplicaveisArray.push(new FormControl(produtoId));
    });

    this.editingPromocaoId = promocao.id;
    this.openModal();
  }

  excluirPromocao(promocaoId: number) {
    if (confirm('Tem certeza que deseja excluir esta promoção?')) {
      this.promotionService.excluirPromocao(promocaoId).subscribe({
        next: () => {
          console.log('Promoção excluída com sucesso');
          this.carregarPromocoes();
        },
        error: (erro) => console.error('Erro ao excluir promoção:', erro)
      });
    }
  }

  getProdutoNome(produtoId: number): string {
    const produto = this.produtos.find(p => p.id === produtoId);
    return produto ? produto.nome : 'Produto não encontrado';
  }

  onCheckChange(produtoId: number, event: any) {
    const produtosAplicaveisArray = (this.promocaoForm.get('produtosAplicaveis') as FormArray);
    if (event.target.checked) {
      produtosAplicaveisArray.push(new FormControl(produtoId));
    } else {
      let index = produtosAplicaveisArray.controls.findIndex(x => x.value === produtoId);
      produtosAplicaveisArray.removeAt(index);
    }
  }

  openModal() {
    const modal = document.getElementById('promocaoModal');
    const bsModal = new bootstrap.Modal(modal); // Bootstrap 5
    bsModal.show();
  }

  closeModal() {
    const modal = document.getElementById('promocaoModal');
    const bsModal = bootstrap.Modal.getInstance(modal); // Bootstrap 5
    bsModal.hide();
  }
}

