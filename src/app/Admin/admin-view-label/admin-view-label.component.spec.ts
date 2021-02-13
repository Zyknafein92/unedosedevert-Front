import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTagCategorieComponent } from './admin-view-label.component';

describe('AdminViewTagCategorieComponent', () => {
  let component: AdminViewTagCategorieComponent;
  let fixture: ComponentFixture<AdminViewTagCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewTagCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTagCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
