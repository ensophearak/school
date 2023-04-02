import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDetailPanelComponent } from './school-detail-panel.component';

describe('SchoolDetailPanelComponent', () => {
  let component: SchoolDetailPanelComponent;
  let fixture: ComponentFixture<SchoolDetailPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolDetailPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDetailPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
