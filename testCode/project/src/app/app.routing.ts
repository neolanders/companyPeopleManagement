import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'app/app.component';

const AppRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'companies', pathMatch: 'full' },
      {
        path: 'companies',
        loadChildren: 'app/companies/companies.module#CompaniesModule'
      }
    ]
  }
];
export const appRoutes = AppRoutes;
export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
