import buildingATemplateDrivenForm from 'src/learn/buildingATemplateDrivenForm';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import buildingAReactiveForm from 'src/learn/buildingAReactiveForm';
import addingFormValidation from 'src/learn/addingFormValidation';
import reactingToChanges from 'src/learn/reactingToChanges';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    buildingATemplateDrivenForm();
    buildingAReactiveForm();
    addingFormValidation();
    reactingToChanges();
  }

}
