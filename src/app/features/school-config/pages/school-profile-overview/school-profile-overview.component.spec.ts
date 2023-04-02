import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolProfileOverviewComponent } from './school-profile-overview.component';

describe('SchoolProfileOverviewComponent', () => {
  let component: SchoolProfileOverviewComponent;
  let fixture: ComponentFixture<SchoolProfileOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolProfileOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolProfileOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
