import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolConfigLayoutComponent } from './school-config-layout.component';

describe('SchoolConfigLayoutComponent', () => {
  let component: SchoolConfigLayoutComponent;
  let fixture: ComponentFixture<SchoolConfigLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolConfigLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolConfigLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
