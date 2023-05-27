import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CartService } from '../services/cart.service';
import { LibrosService } from '../services/libros.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Libros } from '../interfaces/libros';

import { DialogComponent } from './dialog/dialog.component';
import Swal from 'sweetalert2';
import { AutorDialogComponent } from './autor-dialog/autor-dialog.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  libros: Libros[] = []
  carrito: any[] = []

  mostrarCarrito = false;

  ngOnInit(): void {
    this.librosservice.obtenerListaLibros().subscribe(resp => {     
      this.libros = resp
    });
    this.obtenerCarrito();
  }

  constructor( 
    private authservice: AuthService,
    private librosservice: LibrosService,
    private cartservice: CartService,
    private dialog: MatDialog ) { }

  //obtener usuario
  get usuario() {
    return this.authservice.usuario.nombre
  }
 
  //agregar el libro al carrito
  agregarProducto(libro: Libros) {
    return this.cartservice.addToCart(libro).subscribe()
  }

  //edit, create, eliminar libros
  editarLibro(libro: Libros ) {
    this.dialog.open(DialogComponent, {
      data: libro
    });
  }

  registrarLibro() {
    this.dialog.open(DialogComponent);
  };

  elimnarLibro(idLibro: string) {
    return this.librosservice.deleteLibro(idLibro).subscribe( resp => {
      const listadoLibros = this.libros.filter(valor => valor._id !== resp._id)
      this.librosservice.actualizarListaLibros(listadoLibros),
      Swal.fire(`Libro ${resp.nombre}`,'Eliminado','success')
    })
  }

  //create y eliminar autor
  registrarAutor() {
    this.dialog.open(AutorDialogComponent);
  };
  
  eliminarAutor() {
    this.dialog.open(AutorDialogComponent, {
      data: true
    });
  }

  //manterner carrito
  obtenerCarrito() {
    return this.cartservice.carritoItems().subscribe( resp => {
      this.cartservice.agregarCarrito(resp)      
    });    
  }

}
