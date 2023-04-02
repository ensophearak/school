import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCampusComponent } from './school-campus.component';

describe('SchoolCampusComponent', () => {
  let component: SchoolCampusComponent;
  let fixture: ComponentFixture<SchoolCampusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCampusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
