import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassManagerPanelComponent } from './class-manager-panel.component';

describe('ClassManagerPanelComponent', () => {
  let component: ClassManagerPanelComponent;
  let fixture: ComponentFixture<ClassManagerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassManagerPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassManagerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
