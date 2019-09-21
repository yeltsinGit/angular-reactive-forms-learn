import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonFormComponent } from './person-form/person-form.component';

@Injectable()
export class PersonsGuard implements CanDeactivate<PersonFormComponent>, CanActivate {
  canActivate(): boolean {
    return confirm('This form uses old style Template driven form. Continue?');
  }

  canDeactivate(component: PersonFormComponent): boolean {
    if (component.personForm.dirty) {
      const name = component.personForm.get('name').value;
      return confirm(`Leave and loose the unsaved changes for ${name}?`);
    } else {
      return true;
    }
  }

}
