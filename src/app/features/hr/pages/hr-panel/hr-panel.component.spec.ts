import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrPanelComponent } from './hr-panel.component';

describe('HrPanelComponent', () => {
  let component: HrPanelComponent;
  let fixture: ComponentFixture<HrPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
