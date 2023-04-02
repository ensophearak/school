import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolBuildingComponent } from './school-building.component';

describe('SchoolBuildingComponent', () => {
  let component: SchoolBuildingComponent;
  let fixture: ComponentFixture<SchoolBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolBuildingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
