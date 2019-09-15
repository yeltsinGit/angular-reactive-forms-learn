import { PersonFormOldStyleComponent } from './persons/person-form-old-style/person-form-old-style.component';
import { PersonFormComponent } from './persons/person-form/person-form.component';
import { PersonComponent } from './persons/person/person.component';
import { PersonsComponent } from './persons/persons.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'persons', component: PersonsComponent },
  { path: 'persons/:id', component: PersonComponent },
  { path: 'addPerson', component: PersonFormComponent },
  { path: 'addPerson-oldStyle', component: PersonFormOldStyleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
