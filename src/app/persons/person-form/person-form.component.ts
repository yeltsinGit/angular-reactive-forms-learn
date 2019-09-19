import { PersonsService } from './../persons.service';
import { Person } from 'src/app/models/person';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime } from 'rxjs/operators';

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
  nameErrorMsg: string = null;
  emailErrorMsg: string = null;
  emailConfirmErrorMsg: string = null;
  private toggleDynamicValidators = false;
  private toggleCustomValidators = false;
  private messages = {
    required: 'This field is required',
    minlength: 'Field length should be minimum 3 characters',
    maxlength: 'Field length should be maximum 50 characters',
    emailMatch: 'Fields don\'t match',
  }

  constructor(private personsService: PersonsService, private fb: FormBuilder, private toastr: ToastrService) { }

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

    this.personForm.get('addressType').valueChanges.subscribe(
      value => this.toastr.success(`${value} selected`),
    )
    this.personForm.get('name').valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.checkControlsValidations(value),
    )
    this.personForm.get('emailGroup.email').valueChanges.subscribe(
      value => this.checkControlsValidations(value),
    )
    this.personForm.get('emailGroup.emailConfirm').valueChanges.subscribe(
      value => this.checkControlsValidations(value),
    )
  }

  formControlInvalid(controlName: string): boolean {
    return ((this.personForm.get(controlName).touched || this.personForm.get(controlName).dirty) && !this.personForm.get(controlName).valid);
  }

  private checkControlsValidations(c: AbstractControl) {
    if (!this.formControlInvalid('name') && !this.formControlInvalid('emailGroup.email')) return;
    const nameControl = this.personForm.get('name');
    const emailControl = this.personForm.get('emailGroup.email');
    const emailGroupControl = this.personForm.get('emailGroup');
    
    if (nameControl.errors) {
      this.nameErrorMsg = Object.keys(nameControl.errors).map(key => this.messages[key]).join(' ');
    } else {
      this.nameErrorMsg = '';
    }
    if (emailControl.errors) {
      this.emailErrorMsg = Object.keys(emailControl.errors).map(key => this.messages[key]).join(' ')
    } else {
      this.emailErrorMsg = '';
    }
    if (emailGroupControl.errors) {
      this.emailConfirmErrorMsg = Object.keys(emailGroupControl.errors).map(key => this.messages[key]).join(' ')
    } else {
      this.emailConfirmErrorMsg = '';
    }
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
