import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCargoComponent } from './other-cargo.component';

describe('OtherCargoComponent', () => {
  let component: OtherCargoComponent;
  let fixture: ComponentFixture<OtherCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherCargoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OtherCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
