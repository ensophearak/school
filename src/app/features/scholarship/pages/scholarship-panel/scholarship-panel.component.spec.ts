import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipPanelComponent } from './scholarship-panel.component';

describe('ScholarshipPanelComponent', () => {
  let component: ScholarshipPanelComponent;
  let fixture: ComponentFixture<ScholarshipPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScholarshipPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
