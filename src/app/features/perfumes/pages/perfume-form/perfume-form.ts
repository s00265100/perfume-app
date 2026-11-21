import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfume-form',
  imports: [ReactiveFormsModule],
  templateUrl: './perfume-form.html',
  styleUrl: './perfume-form.css'
})
export class PerfumeForm {

  private formBuilder = inject(FormBuilder);

  perfumeForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    scentType: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
    gender: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
  });

  onSubmit(): void {
    console.log('Submitted Perfume:', this.perfumeForm.getRawValue());
  }
}