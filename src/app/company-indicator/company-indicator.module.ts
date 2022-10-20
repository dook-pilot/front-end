import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyIndicatorComponent } from 'app/company-indicator/company-indicator.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    

  ],
  declarations: [
    
    CompanyIndicatorComponent
  ]
})

export class CompanyIndicatorModule {}
