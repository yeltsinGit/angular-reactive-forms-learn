import { PersonsService } from './../persons.service';
import { Person } from 'src/app/models/person';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  person = new Person('');

  constructor(private personsService: PersonsService, private fb: FormBuilder) { }

  ngOnInit() {
    /* Using a form group */    
    // this.personForm = new FormGroup({
    //   name: new FormControl(),
    //   email: new FormControl(),
    //   hasAddress: new FormControl(true),
    // });

    /* Using a form builder - recommended */
    this.personForm = this.fb.group({
      name: null,
      email: {value: '', disabled: false}, // different synthax
      hasAddress: [true], // other different synthax
    });
  }

  submitForm() {
    this.personsService.savePerson(this.person);
  }

  onPopulateBtnClick() {
    this.personForm.patchValue({ // ot setValue for all controls
      name: 'Leon Yalin',
      email: 'yelinichevl@gmail.com',
    });
  }
}
