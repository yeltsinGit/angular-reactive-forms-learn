import { PersonsService } from './persons.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../models/person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsComponent implements OnInit {
  persons$: Observable<IPerson[]>;

  constructor(private personsService: PersonsService) { }

  ngOnInit() {
    this.persons$ = this.personsService.loadPersons();
  }

}
