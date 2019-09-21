import { CustomValidators } from './../customValidators';
import { PersonsService } from './../persons.service';
import { Person } from 'src/app/models/person';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonFormComponent implements OnInit, OnDestroy {
  personForm: FormGroup;
  person = new Person('');
  nameErrorMsg: string = null;
  emailErrorMsg: string = null;
  emailConfirmErrorMsg: string = null;
  addressCityErrorMsg: string = null;
  addressZipErrorMsg: string = null;
  private toggleDynamicValidators = false;
  private toggleCustomValidators = false;
  private messages = {
    required: 'This field is required',
    minlength: 'Field length should be minimum 3 characters',
    maxlength: 'Field length should be maximum 50 characters',
    emailMatch: 'Fields don\'t match',
    even: 'Field should be even',
  }
  private destroy$ = new Subject();

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
      }, { validators: [CustomValidators.emailGroupValidator] }),
      hasAddress: [true],
      addresses: this.fb.array([this.createAddressGroup()]),
    });

    this.personForm.get('name').valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.checkControlsValidations(value),
    )
    this.personForm.get('emailGroup.email').valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.checkControlsValidations(value),
    )
    this.personForm.get('emailGroup.emailConfirm').valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.checkControlsValidations(value),
    )
    this.personForm.get('addresses').valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      value => this.checkControlsValidations(value),
    )
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  formControlInvalid(controlName: string): boolean {
    return ((this.personForm.get(controlName).touched || this.personForm.get(controlName).dirty) && !this.personForm.get(controlName).valid);
  }

  private checkControlsValidations(c: AbstractControl) {
    if (!this.formControlInvalid('name') && !this.formControlInvalid('emailGroup') && !this.formControlInvalid('addresses')) return;
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
    const cityError = this.addressesCities.find(control => control.errors);
    if (cityError) {
      this.addressCityErrorMsg = Object.keys(cityError.errors).map(key => this.messages[key]).join(' ')
    } else {
      this.addressCityErrorMsg = '';
    }
    const zipError = this.addressesCities.find(control => control.errors);
    if (zipError) {
      this.addressZipErrorMsg = Object.keys(zipError.errors).map(key => this.messages[key]).join(' ')
    } else {
      this.addressZipErrorMsg = '';
    }
  }

  private createAddressGroup(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      addressCity: null,
      addressZip: null,
    });
  }

  addAnotherAddress() {
    const addresses = this.personForm.get('addresses'); 
    (<FormArray>addresses).push(this.createAddressGroup());
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
    const addresses: FormArray = <FormArray>this.personForm.get('addresses');
    for (const group of addresses.controls) {
      const controls = (<FormGroup>group).controls;
      if (controls.addressCity) {
        const cityControl: AbstractControl = controls.addressCity;
        if (this.toggleDynamicValidators) {
          cityControl.setValidators([Validators.required, Validators.minLength(2)])
        } else {
          cityControl.clearValidators();
        }
        cityControl.updateValueAndValidity();
      }
    }
  }

  onCustomValidatorsBtnClick() {
    this.toggleCustomValidators = !this.toggleCustomValidators;
    const cityControl: AbstractControl = this.personForm.get('addressGroup.addressZip');
    if (this.toggleCustomValidators) {
      cityControl.setValidators([Validators.required, CustomValidators.evenValidator]);
      // see CustomValidators.eventValidatorWithParams(true) function for validators with params
    } else {
      cityControl.clearValidators();
    }
    cityControl.updateValueAndValidity();
  }

  get addressesCities() {
    return (<FormArray>this.personForm.get('addresses')).controls
      .map(group => (<FormGroup>group).controls)
      .map(groupControls => groupControls.addressCity)
  }

  get addressesZips() {
    return (<FormArray>this.personForm.get('addresses')).controls
      .map(group => (<FormGroup>group).controls)
      .map(groupControls => groupControls.addressZip)
  }
}
