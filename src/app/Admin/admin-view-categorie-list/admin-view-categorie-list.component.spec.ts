import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCategorieListComponent } from './admin-view-categorie-list.component';

describe('AdminViewCategorieListComponent', () => {
  let component: AdminViewCategorieListComponent;
  let fixture: ComponentFixture<AdminViewCategorieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewCategorieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewCategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
