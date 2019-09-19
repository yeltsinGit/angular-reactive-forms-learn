import { delimeterMsg, logF, log } from 'src/learn/utils';

function usingBuiltInValidators() {
  log('To use build-in form validators, we remove the validation from html and add it to the formBuilder.',
    'e.g. "name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],"',
    'To add/remove dynamic validators, use "setValidators / clearValidators / updateValueAndValidity" methods.');
}

function usingCustomValidators() {
  log('To use custom form validators, we should create a function with the specific signature.',
    'This function will return object containing validator name if invalid or nul otherwise. See example in onCustomValidatorsBtnClick() method.',
    'To use a custom validator with parameters, wrap a custom validator function with other function and pass parameters.');
}

function usingCrossFieldValidators() {
  log('To use cross field validation, create a nested formGroup and put all the required formControls inside it.',
    'Next, create a custom validator and write logic to check the desired state of group controls.');
}

export default function addingFormValidation() {
  delimeterMsg('ADDING FORM VALIDATION');
  logF(usingBuiltInValidators);
  logF(usingCustomValidators);
  logF(usingCrossFieldValidators);
}
