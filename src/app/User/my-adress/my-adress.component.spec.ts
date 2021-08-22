import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdressComponent } from './my-adress.component';

describe('MyAdressComponent', () => {
  let component: MyAdressComponent;
  let fixture: ComponentFixture<MyAdressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
