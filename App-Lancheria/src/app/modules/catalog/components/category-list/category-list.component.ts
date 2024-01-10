import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../shared/model/category.model';
import { CategoryService } from '../../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categorias: Category[] = [];

  @Output() categoriaSelecionada = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategorias().subscribe(
      data => this.categorias = data,
      error => console.error(error)
    );
  }

  selecionarCategoria(id: number) {
    this.categoriaSelecionada.emit(id);
  }
}
