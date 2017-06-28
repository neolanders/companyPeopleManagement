import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Company, Person } from './companies.model';
import { environment } from 'environments/environment';
import 'rxjs/Rx';

@Injectable()
export class CompaniesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: Http) { }


  deletePerson(id): Observable<void> {
    console.log('id___', id);
    return this.http.delete(`${this.apiUrl}/person/${id}`)
      .map((res: Response) => { return res; })
      .catch(this.handleError);
  }

  deleteCompany(id): Observable<void> {
    console.log('id___', id);
    return this.http.delete(`${this.apiUrl}/companies/${id}`)
      .map((res: Response) => {
        return res;
      })
      .catch(this.handleError);
  }

  updateCompany(values): Observable<void> {
    const payload: Company = {
      'id': values.id,
      'name': values.name,
      'address': values.address,
      'revenue': values.revenue,
      'phone': values.phone
    };
    if(values.id){
      return this.http.put(`${this.apiUrl}/companies/${values.id}`, payload)
        .map((res: Response) => { return res; })
        .catch(this.handleError);
    } else {
      return this.http.post(`${this.apiUrl}/companies`, payload)
        .map((res: Response) => { return res.json(); })
        .catch(this.handleError);
    }
  }

  updatePerson(values): Observable<void> {
    const payload: Person = {
      'id': values.id,
      'name': values.name,
      'email': values.email,
      'companyId': values.companyId
    };
    if(values.id){
      return this.http.put(`${this.apiUrl}/person/${values.id}`, payload)
        .map((res: Response) => { return res; })
        .catch(this.handleError);
    } else {
      return this.http.post(`${this.apiUrl}/person`, payload)
        .map((res: Response) => { return res.json(); })
        .catch(this.handleError);
    }
  }

  getPerson(id): Observable<Person> {
    return this.http.get(`${this.apiUrl}/person/${id}`)
      .map((res: Response) => this.mapPerson(res.json()))
      .catch(this.handleError);
  }

  getCompany(id): Observable<Company> {
    return this.http.get(`${this.apiUrl}/companies/${id}`)
      .map((res: Response) => this.mapCompany(res.json()))
      .catch(this.handleError);
  }

  getCompanyPeople(id): Observable<Person[]> {
    return this.http.get(`${this.apiUrl}/companies/${id}/people`)
      .map((res: Response) => this.mapPersons(res.json()))
      .catch(this.handleError);
  }


  getCompanies(): Observable<Company[]> {
    return this.http.get(`${this.apiUrl}/companies`)
      .map((res: Response) => this.mapCompanies(res.json()))
      .catch(this.handleError);
  }

  mapCompany(companyJson: any): Company {
    return <Company>{
      id: companyJson._id,
      name: companyJson.name,
      address: companyJson.address,
      revenue: companyJson.revenue,
      phone: companyJson.phone
    };
  }

  mapPerson(personJson: any): Person {
    return <Person>{
      id: personJson._id,
      name: personJson.name,
      email: personJson.email,
      companyId: personJson.companyId
    };
  }

  mapCompanies(companiesJson: any[]): Company[] {
    return companiesJson.map(company => <Company>{
      id: company._id,
      name: company.name,
      address: company.address,
      revenue: company.revenue,
      phone: company.phone
    });
  }

  mapPersons(personsJson: any[]): Person[] {
    return personsJson.map(person => <Person>{
      id: person._id,
      name: person.name,
      email: person.email,
      companyId: person.companyId
    });
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error('errMsg', errMsg);
    return Observable.throw(errMsg);
  }
}
