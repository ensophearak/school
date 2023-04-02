import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSchoolFormComponent } from './new-school-form.component';

describe('NewSchoolFormComponent', () => {
  let component: NewSchoolFormComponent;
  let fixture: ComponentFixture<NewSchoolFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSchoolFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSchoolFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
