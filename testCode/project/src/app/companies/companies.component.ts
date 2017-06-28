import { Component, OnInit } from '@angular/core';
import { CompaniesService } from "./companies.service";
import { Company } from './companies.model';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  public companies: Company[];
  public filteredCompanies: Company[];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.assignCopy();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  assignCopy() {
    this.filteredCompanies = Object.assign([], this.companies);
  }

  filterCompanies(value) {
    if(!value) this.assignCopy(); //when nothing has typed
    this.filteredCompanies = Object.assign([], this.companies).filter(
      company => company.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  onPublishCallback(event) {
    this.getCompanies();
  }
}
