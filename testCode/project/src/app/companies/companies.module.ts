import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { companiesRouting } from './companies.routing';
import { CompaniesService } from './companies.service';
import { PhoneDirective } from 'app/shared/ui/phone/phone.directive';
import { CompaniesListComponent } from './companies-list';
import { CompanyDetailsComponent } from './company-details';
import { PersonDetailsComponent } from './person-details';
import { CompaniesComponent } from './companies.component';
import { CompanyFormComponent } from './shared/forms/company-form';
import { PersonFormComponent } from './shared/forms/person-form';
import { PersonsListComponent } from './persons-list';

let components = [
  PhoneDirective,
  CompaniesComponent,
  CompanyDetailsComponent,
  PersonDetailsComponent,
  CompaniesListComponent,
  CompanyFormComponent,
  PersonFormComponent,
  PersonsListComponent
];

@NgModule({
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    companiesRouting
  ],
  declarations: [
    ...components
  ],
  exports: [
    CompanyFormComponent
  ],
  providers: [
    CompaniesService
  ]
})
export class CompaniesModule { }
