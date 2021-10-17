import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { HomeComponent } from './components/pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ShopDescriptionComponent } from './components/shop-description/shop-description.component';
import { StoreComponent } from './components/pages/store/store.component';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { FooterComponent } from './components/footer/footer.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { ProductsSearchComponent } from './components/product-search/product-search.component';
import { StoreItemsComponent } from './components/store-items/store-items.component';
import { StoreFilterComponent } from './components/store-filter/store-filter.component';
import { StoreModalComponent } from './components/store-modal/store-modal.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { AdminModalComponent } from './components/admin-modal/admin-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    ShopDescriptionComponent,
    StoreComponent,
    FooterComponent,
    SearchPipe,
    ProductsSearchComponent,
    StoreItemsComponent,
    StoreFilterComponent,
    StoreModalComponent,
    OrderComponent,
    OrderDetailsComponent,
    OrderSuccessComponent,
    CartComponent,
    AdminComponent,
    AdminEditComponent,
    AdminModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
