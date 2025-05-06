import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {
constructor(private dialogRef: MatDialogRef<OrderConfirmationComponent>,private cartService: CartService){}

cart: any[] = [];


ngOnInit(): void {
  this.cart = this.cartService.getCart(); // retrieve the saved cart
}

getTotal(): number {
  return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

Closedialog() {
  this.cartService.clearCart(); 
  this.dialogRef.close();      
}
  
}