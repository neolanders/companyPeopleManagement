import { Route, RouterModule }  from '@angular/router';
import { CompaniesComponent } from './companies.component';
import { PersonsListComponent } from './persons-list';
import { CompanyDetailsComponent } from './company-details';
import { PersonDetailsComponent } from './person-details';

const companiesRoutes: Route[] = [
  {
    path: '',
    component: CompaniesComponent
  },
  {
    path: 'details/:id',
    component: CompanyDetailsComponent
  },
  {
    path: 'person/details/:id',
    component: PersonDetailsComponent
  },
  {
    path: ':id/peoples',
    component: PersonsListComponent
  }
];

export const companiesRouting = RouterModule.forChild(companiesRoutes);
