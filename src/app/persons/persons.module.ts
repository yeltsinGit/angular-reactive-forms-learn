import { RouterModule } from '@angular/router';
import { PersonsService } from './persons.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from '../person/person.component';



@NgModule({
  declarations: [PersonsComponent, PersonComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [PersonsService]
})
export class PersonsModule { }
