import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import gettingStartedWithForms from 'src/learn/gettingStartedWithReactiveForms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'angular-reactive-forms-learn';

  ngOnInit() {
    gettingStartedWithForms();
  }
}
