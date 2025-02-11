import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPickerComponent } from './cargo-picker.component';

describe('CargoPickerComponent', () => {
  let component: CargoPickerComponent;
  let fixture: ComponentFixture<CargoPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargoPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CargoPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
