import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsPortfolio } from './signals-portfolio';

describe('SignalsPortfolio', () => {
  let component: SignalsPortfolio;
  let fixture: ComponentFixture<SignalsPortfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsPortfolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsPortfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
