import { PersonsService } from './persons.service';
import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { IPerson } from '../models/person';

@Injectable()
export class PersonsResolver implements Resolve<IPerson[]> {
  constructor(private personsService: PersonsService) {}

  resolve() {
    return this.personsService.loadPersons();
  }
}