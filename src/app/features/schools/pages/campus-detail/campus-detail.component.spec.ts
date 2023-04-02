import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusDetailComponent } from './campus-detail.component';

describe('CampusDetailComponent', () => {
  let component: CampusDetailComponent;
  let fixture: ComponentFixture<CampusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
