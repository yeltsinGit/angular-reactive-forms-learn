import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static evenValidator(c: AbstractControl): { [key: string]: boolean } | null {
    if (c.value !== null && !isNaN(c.value) && c.value % 2 !== 0) {
      return { 'even': true };
    }
    return null;
  }

  static evenValidatorWithParams(even = true): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value !== null && !isNaN(c.value) && (even ? c.value % 2 !== 0 : c.value % 2 !== 1)) {
        return { 'even': true };
      }
      return null;
    }
  }

  static emailGroupValidator(c: AbstractControl): { [key: string]: boolean } | null {
    const email = c.get('email');
    const emailConfirm = c.get('emailConfirm');
  
    if (email.pristine || emailConfirm.pristine) return null;
  
    if (email.value !== emailConfirm.value) {
      return { 'emailMatch': true };
    }
    return null;
  }
}