import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  Inject
} from '@angular/core';
import { CompaniesService } from 'app/companies/companies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'app/companies/companies.model';

@Component({
  selector: 'company-form',
  templateUrl: 'company-form.component.html'

})
export class CompanyFormComponent implements OnInit {
  @Input() companyInput?: Company;
  @Output('publishCallback') publishCallback = new EventEmitter();

  public success: boolean = false;
  public formSubmitted: boolean = false;
  public form: FormGroup;

  constructor(@Inject(FormBuilder) public fb: FormBuilder,
              private companiesService: CompaniesService) { }

  ngOnInit() {
    this.initForm(this.companyInput);
  }

  initForm(data?) {
    this.form = this.fb.group({
      'name': [(data ? data.name : null), Validators.compose([Validators.required])],
      'address': [(data ? data.address : null), Validators.compose([Validators.required])],
      'revenue': [(data ? data.revenue : null), Validators.compose([Validators.required])],
      'phone': [(data ? data.phone : null), Validators.compose([Validators.required])]
    });
  }

  publishCompany(company) {
    this.publishCallback.emit({
      company: company
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted = true;
    if(this.companyInput && this.companyInput.id){
      this.form.value.id = this.companyInput.id;
    }
    this.companiesService.updateCompany(this.form.value).subscribe((result) => {
        if (result) {
          this.success = true;
          this.publishCompany(result);
        }
      },
      (error) => {
        this.success = false;
      });
    return false;
  }
}
