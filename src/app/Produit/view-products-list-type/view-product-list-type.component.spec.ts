import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductListTypeComponent } from './view-product-list-type.component';

describe('UserViewTypeProduitListComponent', () => {
  let component: ViewProductListTypeComponent;
  let fixture: ComponentFixture<ViewProductListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductListTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
