import { delimeterMsg, logF, log } from 'src/learn/utils';

function subscribingToChanges() {
  log('We can subscribe to form elements changes using "valueChanges" and "statusChanges" observables.',
    'Doing this will allow dynamic template updates, for example we can move css classes logic and errors logic to javascript.',
    'In addition, we can use RxJs operators such as debounceTime to customize valueChanges flow.');
}

export default function reactingToChanges() {
  delimeterMsg('REACTING TO CHANGES');
  logF(subscribingToChanges);
}
