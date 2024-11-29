import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComidaOrderPage } from './comida-order.page';

describe('ComidaOrderPage', () => {
  let component: ComidaOrderPage;
  let fixture: ComponentFixture<ComidaOrderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidaOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
