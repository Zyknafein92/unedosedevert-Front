import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierEditComponent } from './panier-edit.component';

describe('PanierEditComponent', () => {
  let component: PanierEditComponent;
  let fixture: ComponentFixture<PanierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
