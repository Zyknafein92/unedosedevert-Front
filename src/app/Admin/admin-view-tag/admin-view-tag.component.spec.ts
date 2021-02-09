import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTagComponent } from './admin-view-tag.component';

describe('AdminViewTagComponent', () => {
  let component: AdminViewTagComponent;
  let fixture: ComponentFixture<AdminViewTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
