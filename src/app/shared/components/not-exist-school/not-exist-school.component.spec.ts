import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotExistSchoolComponent } from './not-exist-school.component';

describe('NotExistSchoolComponent', () => {
  let component: NotExistSchoolComponent;
  let fixture: ComponentFixture<NotExistSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotExistSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotExistSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
