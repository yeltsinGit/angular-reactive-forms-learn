import { delimeterMsg, logF, log } from 'src/learn/utils';

function addingBindings() {
  log('To build a template driven form, we nust create html bindings for the form and each form control.',
    'The difference between template driven form and reactive form is what in template driven form all the logic is inside HTML, and in reactive form inside js.',
    'First, we set the form reference to use it all across the form html: <form "#personForm="ngForm" (ngSubmit)="submitForm(personForm)">',
    'For example, we can disable the submit button: "<button [disabled]="!personForm.valid">', 'Next, we create a formControl model for each control in the form:',
    `
      <input id="name" class="form-control" placeholder="Name (required)" required minlength="3" name="name"
        #personName="ngModel" [(ngModel)]="person.name"
        [ngClass]="{'is-invalid': (personName.touched || personName.dirty) && !personName.valid}">
      <span class="invlid-feedback" *ngIf="(personName.touched || personName.dirty) && !personName.valid">
        <span *ngIf="personName.errors?.required">This field is required</span>
        <span *ngIf="personName.errors?.minlength">Field length should be minimum 3 characters</span>
      </span>`,
    'Form control can be referenced via "name" attribute or the js variable, e.g. #personName', 'We can also put validation messages on each field.',
    'All the validation logic is repeated for each form control.', 'Template driven for are good for simple forms, but for complex scenarios,',
    'for example dynamically adding additional addresses or async validations we should use Reactive forms.');
}

export default function buildingATemplateDrivenForm() {
  delimeterMsg('BUILDING A TEMPLATE DRIVEN FORM');
  logF(addingBindings);
}