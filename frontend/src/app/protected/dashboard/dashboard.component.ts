import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LibrosService } from '../services/libros.service';
import { Libros } from "../interfaces/libros";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { CarritoCompras } from '../interfaces/carrito';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  libros: Libros[] = []
  carrito: any[] = []

  mostrarCarrito = false;

  ngOnInit(): void {
    this.obtenerLibros()
  }

  constructor( private authservice: AuthService,
               private librosservice: LibrosService,
               private cartservice: CartService ) {}
  
  get usuario() {
    return this.authservice.usuario.nombre
  }

  obtenerLibros() {
   this.librosservice.obtenerLibros()
      .subscribe( resp => { this.libros = resp.books })
  }

  agregarProducto(index: number) {
    return this.cartservice.addToCart(this.libros[index])
  }


}
