import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualDetailsComponent } from './individual-details.component';

describe('IndividualDetailsComponent', () => {
  let component: IndividualDetailsComponent;
  let fixture: ComponentFixture<IndividualDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
