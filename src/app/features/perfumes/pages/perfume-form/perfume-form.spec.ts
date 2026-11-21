import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeForm } from './perfume-form';

describe('PerfumeForm', () => {
  let component: PerfumeForm;
  let fixture: ComponentFixture<PerfumeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfumeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfumeForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
