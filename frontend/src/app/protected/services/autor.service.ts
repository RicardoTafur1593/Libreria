import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, getAuthor } from '../interfaces/author';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<getAuthor> {
    const url = `${this.baseUrl}/authors`;
    return this.http.get<getAuthor>(url)
  }

  registrarAuthor(autor: Author) {
    const url = `${this.baseUrl}/authors`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.http.post<Author>(url, autor, {headers: headers})
      .pipe(catchError(err => of(err.error.msg)))
  }

  deleteAutor(idAutor: string): Observable<Author> {   
    const url = `${this.baseUrl}/authors/${(idAutor as any)._id}`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.http.delete<Author>(url, {headers: headers})
      .pipe(catchError(err => of(err.error.msg)))
  }

}
