import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'app/companies/companies.service';
import { Company } from 'app/companies/companies.model';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'company-details',
  templateUrl: 'company-details.component.html'

})
export class CompanyDetailsComponent implements OnInit {

  public companyId: string;
  public company: Company;

  constructor(private route: ActivatedRoute,
              private companiesService: CompaniesService) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.params['id'];
    this.companiesService.getCompany(this.companyId).subscribe((company: Company) => {
      this.company = company;
    });
  }
}
