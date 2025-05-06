import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, HttpClientModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  products: any[] = [];
  cart: any[] = [];
  constructor(private cartService: CartService,private router:Router,private dialog: MatDialog) {}





  ngOnInit(): void {
    this.cartService.getProducts().subscribe((data: any[]) => {
      this.products = data;
    });
  }

  
  addToCart(product: any) {
  product.quantity = 1;

  const existing = this.cart.find(item => item.id === product.id);
  if (!existing) {
    this.cart.push({ ...product, quantity: 1 });
  }
}

  
increaseQty(product: any) {
  product.quantity++;

  const cartItem = this.cart.find(item => item.id === product.id);
  if (cartItem) {
    cartItem.quantity++;
  }
}

decreaseQty(product: any) {
  const cartItem = this.cart.find(item => item.id === product.id);

  if (cartItem) {
    if (cartItem.quantity > 1) {
      product.quantity--;
      cartItem.quantity--;
    } else {
      this.removeFromCart(product);
    }
  }
}



removeFromCart(product: any) {
  const productInList = this.products.find(p => p.id === product.id);
  if (productInList) {
    productInList.quantity = 0;
  }

  this.cart = this.cart.filter(item => item.id !== product.id);
}


getTotal(): number {
  return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
getProductQuantity(productId: number): number {
  const item = this.cart.find(p => p.id === productId);
  return item ? item.quantity : 0;
}


confirmOrder() {
  this.cartService.setCart(this.cart); 

  const dialogRef = this.dialog.open(OrderConfirmationComponent, {
    width: '500px',
    autoFocus: false,
    panelClass: 'custom-dialog-container'
  });

  dialogRef.afterClosed().subscribe(() => {
    this.cart = [];
    this.products.forEach(product => product.quantity = 0);
  });
}

}
