import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySettingsComponent } from './delivery-settings.component';

describe('DeliverySettingsComponent', () => {
  let component: DeliverySettingsComponent;
  let fixture: ComponentFixture<DeliverySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverySettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
