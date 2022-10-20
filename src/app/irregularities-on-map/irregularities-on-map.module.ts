import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IrregularitiesOnMapComponent } from 'app/irregularities-on-map/irregularities-on-map.component';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [
    IrregularitiesOnMapComponent,
  ]
})

export class IrregularitiesOnMapModule {}
