import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpaceSelectorComponent } from './my-space-selector.component';

describe('MySpaceSelectorComponent', () => {
  let component: MySpaceSelectorComponent;
  let fixture: ComponentFixture<MySpaceSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySpaceSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpaceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
