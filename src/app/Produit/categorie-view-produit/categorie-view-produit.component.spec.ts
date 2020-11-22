import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieViewProduitComponent } from './categorie-view-produit.component';

describe('CategorieViewProduitComponent', () => {
  let component: CategorieViewProduitComponent;
  let fixture: ComponentFixture<CategorieViewProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieViewProduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieViewProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
