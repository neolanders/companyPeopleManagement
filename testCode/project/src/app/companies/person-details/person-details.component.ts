import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'app/companies/companies.service';
import { Person, Company } from 'app/companies/companies.model';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'person-details',
  templateUrl: 'person-details.component.html'
})
export class PersonDetailsComponent implements OnInit {

  public personId: string;
  public person: Person;
  public companies: Company[];

  constructor(private route: ActivatedRoute,
              private companiesService: CompaniesService) { }

  ngOnInit() {
    this.personId = this.route.snapshot.params['id'];
    this.getPerson();
    this.getCompanies();
  }

  getPerson() {
    this.companiesService.getPerson(this.personId).subscribe(
      (person) => {
        this.person = person;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
