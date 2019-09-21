import { PersonsGuard } from './persons.guard';
import { PersonFormOldStyleComponent } from './person-form-old-style/person-form-old-style.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { PersonComponent } from './person/person.component';
import { PersonsComponent } from './persons.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonsResolver } from './persons.resolver';

const routes: Routes = [
  { path: '', component: PersonsComponent, resolve: { persons: PersonsResolver } },
  { path: 'persons/:id', component: PersonComponent },
  { path: 'addPerson', component: PersonFormComponent, canDeactivate: [PersonsGuard] },
  { path: 'addPerson-oldStyle', component: PersonFormOldStyleComponent, canActivate: [PersonsGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRoutingModule { }