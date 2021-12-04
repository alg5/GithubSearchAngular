import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlyNumericIntegerDirective } from '../cryptocurrency/directives/only-numeric-integer.directive';

@NgModule({
  declarations: [ 
    // OnlyNumericIntegerDirective,

                ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxFileDropModule,
    FontAwesomeModule,
    NgbModule
  ],
  exports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
     NgxPaginationModule,
    NgxFileDropModule,
    // OnlyNumericIntegerDirective
  ]
})
export class SharedModule { }
