// promotion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from '../../shared/model/promotion.model';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = 'http://localhost:3000/promocoes';

  constructor(private http: HttpClient) {}

  getPromocoes(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(this.apiUrl);
  }

  adicionarPromocao(promocao: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(this.apiUrl, promocao);
  }

  atualizarPromocao(promocao: Promotion): Observable<Promotion> {
    return this.http.put<Promotion>(`${this.apiUrl}/${promocao.id}`, promocao);
  }

  excluirPromocao(promocaoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${promocaoId}`);
  }
}
