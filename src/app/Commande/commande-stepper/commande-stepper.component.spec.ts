import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeStepperComponent } from './commande-stepper.component';

describe('CommandeStepperComponent', () => {
  let component: CommandeStepperComponent;
  let fixture: ComponentFixture<CommandeStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
