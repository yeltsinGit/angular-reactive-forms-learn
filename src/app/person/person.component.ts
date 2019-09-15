import { PersonsService } from './../persons/persons.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPerson } from '../models/person';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  person$: Observable<IPerson>;

  constructor(private personsService: PersonsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.person$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.personsService.loadPerson(params.get('id')))
    )
  }

}
