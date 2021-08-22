import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewSousCategorieListComponent } from './admin-view-sous-categorie-list.component';

describe('AdminViewSousCategorieListComponent', () => {
  let component: AdminViewSousCategorieListComponent;
  let fixture: ComponentFixture<AdminViewSousCategorieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewSousCategorieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewSousCategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
