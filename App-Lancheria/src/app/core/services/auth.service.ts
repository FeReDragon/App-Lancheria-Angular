import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/model/user.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>; 
  public currentUser: Observable<User | null>; 

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') ?? '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null { 
    return this.currentUserSubject.value;
  }

  login(email: string, senha: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/usuarios?email=' + email + '&senha=' + senha)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
            this.currentUserSubject.next(users[0]);
          }
        })
      );
  }
  

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); // Permite passar null para o BehaviorSubject
  }
}

