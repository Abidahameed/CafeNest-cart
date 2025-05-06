import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

export const routes: Routes = [
    {
        path:'',
        component:ProductListComponent
    },
    {
        path:'cart',
        component:CartComponent
    },
    {
        path:'order-confirmation',
        component:OrderConfirmationComponent
    }
];
