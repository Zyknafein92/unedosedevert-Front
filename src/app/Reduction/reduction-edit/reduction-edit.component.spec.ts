import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionEditComponent } from './reduction-edit.component';

describe('ReductionEditComponent', () => {
  let component: ReductionEditComponent;
  let fixture: ComponentFixture<ReductionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReductionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReductionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
