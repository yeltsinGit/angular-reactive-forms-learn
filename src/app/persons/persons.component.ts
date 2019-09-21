import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPerson } from '../models/person';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsComponent implements OnInit {
  persons$: Observable<IPerson[]>;

  constructor(private route: ActivatedRoute) {
    this.persons$ = of(this.route.snapshot.data.persons);
  }

  ngOnInit() {
  }

}
