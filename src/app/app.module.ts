import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { authReducer } from './reducers/auth.reducer';
import { AuthEffects } from './effects/auth.effects';
import { ShareModule } from './shared/share.module';
import { cartReducer } from './reducers/cart.reducer';
import { userReducer } from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import { productReducer } from './reducers/product.reducer';
import { ProductEffects } from './effects/product.effect';
import { stockReducer } from './reducers/stock.reducer';
import { StockEffects } from './effects/stock.effect';
import { OrderReducer } from './reducers/order.reducer';
import { OrderEffects } from './effects/order.effect';
import { shippingReducer } from './reducers/shipping.reducer';
import { ShippingEffects } from './effects/shipping.effect';
import { invoiceReducer } from './reducers/invoice.reducer';
import { InvoiceEffects } from './effects/invoice.effect';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    StoreModule.forRoot(
      {
        auth: authReducer,
        cart: cartReducer,
        user: userReducer,
        product: productReducer,
        stock: stockReducer,
        order: OrderReducer,
        shipping : shippingReducer,
        invoice: invoiceReducer
      }, {}),
    EffectsModule.forRoot([
      AuthEffects,
      UserEffects,
      ProductEffects,
      StockEffects,
      OrderEffects,
      ShippingEffects,
      InvoiceEffects
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    HttpClientModule,
    ShareModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
