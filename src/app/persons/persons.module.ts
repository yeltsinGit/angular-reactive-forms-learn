import { PersonsGuard } from './persons.guard';
import { PersonsRoutingModule } from './persons-routing.module';
import { RouterModule } from '@angular/router';
import { PersonsService } from './persons.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsComponent } from './persons.component';
import { PersonComponent } from './person/person.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonFormOldStyleComponent } from './person-form-old-style/person-form-old-style.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonsResolver } from './persons.resolver';

@NgModule({
  declarations: [PersonsComponent, PersonComponent, PersonFormComponent, PersonFormOldStyleComponent],
  imports: [
    CommonModule,
    RouterModule,
    PersonsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PersonsService, PersonsResolver, PersonsGuard]
})
export class PersonsModule { }
