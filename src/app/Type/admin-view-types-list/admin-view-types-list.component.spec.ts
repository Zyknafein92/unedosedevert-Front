import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTypesListComponent } from './admin-view-types-list.component';

describe('AdminViewTypesListComponent', () => {
  let component: AdminViewTypesListComponent;
  let fixture: ComponentFixture<AdminViewTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewTypesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
