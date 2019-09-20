import { delimeterMsg, logF, log } from 'src/learn/utils';

function subscribingToChanges() {
  log('To be able to duplicate form controls, we must use a FormArray. FormArray holds a collectin of formcontrols or form groups.',
    'After we have an array with the desired controls, we loop on them in html using *ngFor. To add a new control, just push it to the array.');
}

export default function dynamicallyDuplicatingElements() {
  delimeterMsg('DYNAMICALLY DUPLICATING ELEMENTS');
  logF(subscribingToChanges);
}
