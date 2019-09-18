import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPerson } from '../models/person';

@Injectable()
export class PersonsService {
  private API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  loadPersons(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${this.API_URL}/users`);
  }

  loadPerson(id: string): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.API_URL}/users/${id}`);
  }

  savePerson(person: IPerson) {
    this.http.post<IPerson>(`${this.API_URL}/users/`, {...person});
  }
}
