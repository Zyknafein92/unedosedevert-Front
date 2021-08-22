import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitBoutonComponent } from './petit-bouton.component';

describe('PetitBoutonComponent', () => {
  let component: PetitBoutonComponent;
  let fixture: ComponentFixture<PetitBoutonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetitBoutonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitBoutonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
