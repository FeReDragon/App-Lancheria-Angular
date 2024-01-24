import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationIQService {
  private apiKey = 'pk.80a3c6bf49c277430aa2bb3809e9b78a';

  constructor(private http: HttpClient) {}

  geocoding(logradouro: string, localidade: string): Observable<any> {
    return this.http.get(`https://eu1.locationiq.com/v1/search.php?key=${this.apiKey}&q=${logradouro}, ${localidade}&format=json`);
  }
}

