import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewVariantComponent } from './admin-view-variant.component';

describe('AdminViewVariantComponent', () => {
  let component: AdminViewVariantComponent;
  let fixture: ComponentFixture<AdminViewVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewVariantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
