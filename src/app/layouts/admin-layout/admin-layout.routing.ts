import { Routes } from '@angular/router';
import { UploadImageComponent } from 'app/upload-image/upload-image.component';
import { IrregularitiesOnMapComponent } from 'app/irregularities-on-map/irregularities-on-map.component';
import { CompanyIndicatorComponent } from 'app/company-indicator/company-indicator.component';

export const AdminLayoutRoutes: Routes = [

    
    {
        path: 'vehicleInformation',
        component: UploadImageComponent,
        children: [{
          path: '',
          loadChildren: () => import('app/upload-image/upload-image.module').then(m => m.uploadImageModule)
        }]
      },
    {
        path: 'CompanyIndicator',
        component: CompanyIndicatorComponent,
        children: [{
          path: '',
          loadChildren: () => import('app/company-indicator/company-indicator.module').then(m => m.CompanyIndicatorModule)
        }]
      },
      {
        path: 'irregularitiesOnMap',
        component: IrregularitiesOnMapComponent,
        children: [{
          path: '',
          loadChildren: () => import('app/irregularities-on-map/irregularities-on-map.module').then(m => m.IrregularitiesOnMapModule)
        }]
      },

];
