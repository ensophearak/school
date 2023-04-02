import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDisabledComponent } from './school-disabled.component';

describe('SchoolDisabledComponent', () => {
  let component: SchoolDisabledComponent;
  let fixture: ComponentFixture<SchoolDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolDisabledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
