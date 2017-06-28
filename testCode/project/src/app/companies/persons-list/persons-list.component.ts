import { Component, OnInit } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { CompaniesService } from "../companies.service";
import { Person, Company } from '../companies.model';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'persons-list',
  templateUrl: 'persons-list.component.html',
  styleUrls: ['persons-list.component.scss'],
})
export class PersonsListComponent implements OnInit {

  public companyId: string;
  public persons: Person[];
  public filteredPersons: Person[];
  public company: Company;

  constructor(private companiesService: CompaniesService,
              private route: ActivatedRoute,
              public modal: Modal,
              private router: Router) { }

  ngOnInit() {
    this.companyId = this.route.snapshot.params['id'];
    this.companiesService.getCompany(this.companyId).subscribe((company: Company) => this.company = company);
    this.companiesService.getCompanyPeople(this.companyId).subscribe((persons: Person[]) => {
      this.persons = persons;
      this.assignCopy();
    });
  }

  assignCopy(){
    this.filteredPersons = Object.assign([], this.persons);
  }

  filterPersons(value){
    if(!value) this.assignCopy(); //when nothing has typed
    this.filteredPersons = Object.assign([], this.persons).filter(
      person => person.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

  editPerson(person: Person) {
    this.router.navigate(['/person/details', person.id]);
  }

  confirmDelete(person) {
    this.modal.confirm()
      .size('lg')
      .isBlocking(true)
      .showClose(true)
      .dialogClass('modal-fullscreen modal-confirmation')
      .body('Are you sure you want to delete the person '+ person.name)
      .okBtn('Ok')
      .cancelBtnClass('hidden')
      .open()
      .then((dialogRef) => <Promise<string>>dialogRef.result)
      .then((result) => {
        if(result){
          this.deletePerson(person.id);
        }
      })
      .catch(err => console.error('CATCHED ERROR', err));
  }


  deletePerson(id){
    this.companiesService.deletePerson(id);
  }
}
