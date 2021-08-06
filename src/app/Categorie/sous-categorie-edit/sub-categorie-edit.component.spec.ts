import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorieEditComponent } from './sub-categorie-edit.component';

describe('SousCategorieEditComponent', () => {
  let component: SubCategorieEditComponent;
  let fixture: ComponentFixture<SubCategorieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategorieEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategorieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
