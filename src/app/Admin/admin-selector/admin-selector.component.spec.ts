import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectorComponent } from './admin-selector.component';

describe('AdminSelectorComponent', () => {
  let component: AdminSelectorComponent;
  let fixture: ComponentFixture<AdminSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
