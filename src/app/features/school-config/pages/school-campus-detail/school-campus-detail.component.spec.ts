import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCampusDetailComponent } from './school-campus-detail.component';

describe('SchoolCampusDetailComponent', () => {
  let component: SchoolCampusDetailComponent;
  let fixture: ComponentFixture<SchoolCampusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolCampusDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolCampusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
