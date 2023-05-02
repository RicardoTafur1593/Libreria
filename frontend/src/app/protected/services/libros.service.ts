import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormLibro, Libros, GetLibro } from '../interfaces/libros';
import { BehaviorSubject, Observable, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseUrl: string = environment.baseUrl;
  private listadoLibros = new BehaviorSubject<Libros[]>([]);

  constructor( private http: HttpClient ) {
    this.obtenerLibros().subscribe(resp => this.listadoLibros.next(resp.books))
  }

  obtenerLibros(): Observable<GetLibro> {
    const url = `${this.baseUrl}/books`;
    return this.http.get<GetLibro>(url)
  }

  modificarLibro(miFormulario: FormLibro, _idLibro: string): Observable<Libros> {
    const url = `${this.baseUrl}/books/${_idLibro}`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.http.put<Libros>(url, miFormulario, {headers:headers})
  }

  registarLibro(nuevoLibro: Libros): Observable<Libros> {
    const url = `${this.baseUrl}/books`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.http.post<Libros>(url, nuevoLibro, {headers: headers})
  }

  actualizarListaLibros(nuevaListaLibros: Libros[]) {    
    this.listadoLibros.next(nuevaListaLibros);
  }

  obtenerListaLibros(): Observable<Libros[]> {
    return this.listadoLibros.asObservable();
  }

  deleteLibro(idLibro: string): Observable<Libros> {
    const url = `${this.baseUrl}/books/${idLibro}`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '')
    return this.http.delete<Libros>(url, {headers: headers})
  }


}
