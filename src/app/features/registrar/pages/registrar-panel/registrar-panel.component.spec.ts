import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPanelComponent } from './registrar-panel.component';

describe('RegistrarPanelComponent', () => {
  let component: RegistrarPanelComponent;
  let fixture: ComponentFixture<RegistrarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
