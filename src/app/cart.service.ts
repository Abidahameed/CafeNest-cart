import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private dataUrl = 'http://localhost:3000/products'; 
  private cartItems: any[] = [];
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }


  setCart(items: any[]) {
    this.cartItems = items;
  }

  getCart() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

}
