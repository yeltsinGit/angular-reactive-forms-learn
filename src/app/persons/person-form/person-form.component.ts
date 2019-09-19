import { PersonsService } from './../persons.service';
import { Person } from 'src/app/models/person';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

function evenValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== null && !isNaN(c.value) && c.value % 2 !== 0) {
    return { 'even': true };
  }
  return null;
}

function eventValidatorWithParams(even = true): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && !isNaN(c.value) && (even ? c.value % 2 !== 0 : c.value % 2 !== 1)) {
      return { 'even': true };
    }
    return null;
  }
}

function emailGroupValidator(c: AbstractControl): { [key: string]: boolean } | null {
  const email = c.get('email');
  const emailConfirm = c.get('emailConfirm');

  if (email.pristine || emailConfirm.pristine) return null;

  if (email.value !== emailConfirm.value) {
    return { 'emailMatch': true };
  }
  return null;
}

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent implements OnInit {
  personForm: FormGroup;
  person = new Person('');
  private toggleDynamicValidators = false;
  private toggleCustomValidators = false;

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
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: [null, [Validators.required, Validators.minLength(3)]],
        emailConfirm: [null, [Validators.required]],
      }, { validators: [emailGroupValidator] }),
      hasAddress: [true],
      addressType: 'home',
      addressCity: { value: null, disabled: false }, // different synthax
      addressZip: null,
    });
  }

  submitForm() {
    this.personsService.savePerson(this.person);
  }

  onPopulateBtnClick() {
    this.personForm.patchValue({ // ot 'setValue' for all controls
      name: 'Leon Yalin'
    });
    this.personForm.get('emailGroup').patchValue({
      'email': 'yelinichevl@gmail.com',
    });
  }

  onDynamicValidatorsBtnClick() {
    this.toggleDynamicValidators = !this.toggleDynamicValidators;
    const cityControl: AbstractControl = this.personForm.get('addressCity');
    if (this.toggleDynamicValidators) {
      cityControl.setValidators([Validators.required, Validators.minLength(2)])
    } else {
      cityControl.clearValidators();
    }
    cityControl.updateValueAndValidity();
  }

  onCustomValidatorsBtnClick() {
    this.toggleCustomValidators = !this.toggleCustomValidators;
    const cityControl: AbstractControl = this.personForm.get('addressZip');
    if (this.toggleCustomValidators) {
      cityControl.setValidators([Validators.required, evenValidator]);
      // see eventValidatorWithParams(true) function for validators with params
    } else {
      cityControl.clearValidators();
    }
    cityControl.updateValueAndValidity();
  }
}
