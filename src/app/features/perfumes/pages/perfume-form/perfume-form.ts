import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { PerfumeService } from '../../services/perfume.service';
import { CreatePerfumeDto } from '../../models/perfume.model';
@Component({
  selector: 'app-perfume-form',
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule ],
  templateUrl: './perfume-form.html',
  styleUrl: './perfume-form.css'
})
export class PerfumeForm {

  private formBuilder = inject(FormBuilder);
  private perfumeService = inject(PerfumeService);
  private router = inject(Router);

  perfumeForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    scentType: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required],
    gender: this.formBuilder.nonNullable.control<'Men' | 'Women' | 'Unisex' | ''>(
  '',
  Validators.required
),
    rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
  });

 onSubmit(): void {

  if (this.perfumeForm.invalid) {
    return;
  }

  const {
    name,
    brand,
    scentType,
    price,
    description,
    gender,
    rating
  } = this.perfumeForm.getRawValue();

  if (!gender) {
    return;
  }

  const newPerfume: CreatePerfumeDto = {
    name,
    brand,
    scentType,
    price,
    description,
    gender,
    rating
  };

  console.log('Submitted Perfume:', newPerfume);

  this.perfumeService.addPerfume(newPerfume).subscribe({
    next: (response) => {
      console.log('Perfume added successfully:', response);
      this.router.navigate(['/perfumes']);
    },
    error: (error) => {
      console.error('Error adding perfume:', error);
    }
  });
}
}