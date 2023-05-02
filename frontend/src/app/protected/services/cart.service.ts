import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Libros } from '../interfaces/libros';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cart = new BehaviorSubject<Libros[]>([]);

  constructor() { }

  getCart() {
    return this.cart.asObservable();
  }

  addToCart(producto: Libros) {
    const valorActualCarrito = this.cart.getValue();
   
    const libroExistente = valorActualCarrito.find(l => l._id === producto._id);

    if (libroExistente) {
      libroExistente.cantidad++;
    } else {
      valorActualCarrito.push({ ...producto, cantidad: 1 });
    }

    this.cart.next([...valorActualCarrito]);
}

  removeFromCart(producto: any) {
    const valorActualCarrito = this.cart.getValue();
    const actualizarCarrito = valorActualCarrito.filter(cartItem => cartItem !== producto);
    this.cart.next(actualizarCarrito);
  }

  actualizarCarrito(_id:string, data: Libros) {
    const obtenerCarrito = this.cart.getValue();
    const actualizarLibro = obtenerCarrito.map(libro => {
      if(libro._id === data._id) {
        return {...libro, 
          nombre: data.nombre,
          disponibilidad: data.disponibilidad,
          precio: data.precio,
          sinopsis: data.sinopsis
        }
      }
      return {...libro}
    })
    this.cart.next(actualizarLibro)    
  }

  clearCart() {
    this.cart.next([]);
  }
}
