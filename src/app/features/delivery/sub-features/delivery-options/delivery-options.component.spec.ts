import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryOptionsComponent } from '@features/delivery/sub-features/delivery-options/delivery-options.component';

describe('DeliveryOptionsComponent', () => {
  let component: DeliveryOptionsComponent;
  let fixture: ComponentFixture<DeliveryOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryOptionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
