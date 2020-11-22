import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductsListComponent } from './view-products-list.component';

describe('UserViewListProductComponent', () => {
  let component: ViewProductsListComponent;
  let fixture: ComponentFixture<ViewProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
