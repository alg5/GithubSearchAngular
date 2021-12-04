import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptocurrencyRoutingModule } from './cryptocurrency-routing.module';
import { CryptocurrencyComponent } from './components/cryptocurrency.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumericIntegerDirective } from './directives/only-numeric-integer.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [CryptocurrencyComponent
    , OnlyNumericIntegerDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CryptocurrencyRoutingModule,
    NgbModule 

  ],
  exports: [
    // OnlyNumericIntegerDirective
  ]
})
export class CryptocurrencyModule { }
