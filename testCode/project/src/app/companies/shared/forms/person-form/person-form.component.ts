import {
  Component,
  OnInit,
  Input,
  Inject
} from '@angular/core';
import { CompaniesService } from 'app/companies/companies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company, Person } from 'app/companies/companies.model';

@Component({
  selector: 'person-form',
  templateUrl: 'person-form.component.html'

})
export class PersonFormComponent implements OnInit {
  @Input() personInput?: Person;
  @Input() companiesInput: Company[];

  public success: boolean = false;
  public formSubmitted: boolean = false;
  public form: FormGroup;
  public selectedCompanyId: string;

  constructor(@Inject(FormBuilder) public fb: FormBuilder,
              private companiesService: CompaniesService) {}

  ngOnInit() {
    if(this.personInput){
      this.selectedCompanyId = this.personInput.companyId;
    }
    this.initForm(this.personInput);
  }

  initForm(data?) {
    const emailRegex: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
    this.form = this.fb.group({
      'name': [(data ? data.name : null), [Validators.required]],
      'email': [(data ? data.email : null), [Validators.required, Validators.pattern(emailRegex)]],
      'companyId': [(data ? data.companyId : null), [Validators.required]]
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted = true;
    this.form.value.companyId = this.selectedCompanyId;
    if(this.personInput){
      this.form.value.id = this.personInput.id;
    }
    this.companiesService.updatePerson(this.form.value).subscribe((result) => {
        if (result) {
          this.success = true;
        }
      },
      (error) => {
        this.success = false;
      });
    return false;
  }
}
