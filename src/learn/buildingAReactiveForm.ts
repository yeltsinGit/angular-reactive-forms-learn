import { delimeterMsg, logF, log } from 'src/learn/utils';

function addingBindings() {
  log('To build a reactive form, we must create a form group model with form controls. The form group is referenced in html with "[formGroup]="personForm" binding.',
  'Form control have a formControlName="name" binding. IF we want to change form data we use setValue (all controls) or patchValue (partial).');
}

export default function buildingAReactiveForm() {
  delimeterMsg('BUILDING A REACTIVE FORM');
  logF(addingBindings);
}