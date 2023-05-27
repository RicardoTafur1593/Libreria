import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LibrosService } from '../services/libros.service';
import { Libros } from "../interfaces/libros";
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart';
import { SocketService } from 'src/app/services/socket.service';

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
    this.obtenerLibros();
    this.obtenerCarrito()
  }

  constructor(
    private authservice: AuthService,
    private librosservice: LibrosService,
    private cartservice: CartService,
    private socketservice: SocketService) {}

  get usuario() {
    return this.authservice.usuario.nombre
  }

  obtenerLibros() {
    this.librosservice.obtenerLibros()
      .subscribe(resp => { this.libros = resp.books })
  }

  obtenerCarrito() {
    return this.cartservice.carritoItems().subscribe(resp => {
      this.cartservice.agregarCarrito(resp)
    });
  }

  agregarProducto(index: number) {
    return this.socketservice.addToCartSocket(this.libros[index])
  }

}
