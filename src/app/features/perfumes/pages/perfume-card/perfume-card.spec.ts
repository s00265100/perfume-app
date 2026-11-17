import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeCard } from './perfume-card';

describe('PerfumeCard', () => {
  let component: PerfumeCard;
  let fixture: ComponentFixture<PerfumeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfumeCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
