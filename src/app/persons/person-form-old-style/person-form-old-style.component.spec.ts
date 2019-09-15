import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormOldStyleComponent } from './person-form-old-style.component';

describe('PersonFormOldStyleComponent', () => {
  let component: PersonFormOldStyleComponent;
  let fixture: ComponentFixture<PersonFormOldStyleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFormOldStyleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormOldStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
