import { PersonsService } from './../persons.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Person } from 'src/app/models/person';

@Component({
  selector: 'app-person-form-old-style',
  templateUrl: './person-form-old-style.component.html',
  styleUrls: ['./person-form-old-style.component.scss']
})
export class PersonFormOldStyleComponent implements OnInit {
  person = new Person('');
  hasAdress = true;

  constructor(private personsService: PersonsService) { }

  ngOnInit() {
  }

  submitForm(personForm: NgForm) {
    console.log('Submitting person form', personForm);
    this.personsService.savePerson(this.person);
  }

}
