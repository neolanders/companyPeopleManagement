import {
  Component,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { CompaniesService } from "../companies.service";
import { Company } from '../companies.model';
import {Router} from "@angular/router";

@Component({
  selector: 'companies-list',
  templateUrl: 'companies-list.component.html',
  styleUrls: ['companies-list.component.scss'],
})
export class CompaniesListComponent {

  @Output('publishCallback') publishCallback = new EventEmitter();
  @Input() companiesInput: Company[];

  constructor(private companiesService: CompaniesService,
              public modal: Modal,
              private router: Router) { }

  editCompany(company: Company) {
    this.router.navigate(['/companies/details', company.id]);
  }

  confirmDelete(company) {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .dialogClass('modal-fullscreen modal-confirmation')
      .body('Are you sure you want to delete the compoany '+ company.name)
      .okBtn('Ok')
      .cancelBtnClass('hidden')
      .open()
      .then((dialogRef) => <Promise<string>>dialogRef.result)
      .then((result) => {
        if(result){
          this.deleteCompany(company.id);
        }
      })
      .catch(err => console.error('CATCHED ERROR', err));
  }


  deleteCompany(id){
    this.companiesService.deleteCompany(id);
  }
}
