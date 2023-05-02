import { Component, OnInit } from '@angular/core';
import { Libros } from 'src/app/protected/interfaces/libros';
import { CartService } from 'src/app/protected/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cartItems: Libros[] = [];
  totalCarrito!: number;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItems = cart
      this.totalCarrito = this.cartItems.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    })    
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item);
  }

  clearCart() {
    this.cartService.clearCart()
  }

  
}

