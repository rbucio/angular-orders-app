import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { OrderListComponent } from './order-list/order-list.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    OrderListComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
        timeOut: 2500,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        toastClass: 'toast-bootstrap',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
