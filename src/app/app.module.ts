import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptorProviders } from "./interceptors";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlyNumericIntegerDirective } from './cryptocurrency/directives/only-numeric-integer.directive';

@NgModule({
  declarations: [
    AppComponent,
    // OnlyNumericIntegerDirective

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbModule
    
  ],
  exports: [],
  providers: [DatePipe, 
              httpInterceptorProviders,
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
            ],

  bootstrap: [AppComponent],
 })
export class AppModule { }
