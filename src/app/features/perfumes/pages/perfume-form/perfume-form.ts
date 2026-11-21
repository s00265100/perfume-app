import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { PerfumeService } from '../../services/perfume.service';
import { CreatePerfumeDto } from '../../models/perfume.model';

@Component({
  selector: 'app-perfume-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './perfume-form.html',
  styleUrl: './perfume-form.css'
})
export class PerfumeForm implements OnInit {

  // Optional roite parameter
  // If there is an id we are editing an existing perfume
  // If there is no idwe are creating a new perfume
  readonly id = input<string>();

  // Inject the services we need
  private formBuilder = inject(FormBuilder);
  private perfumeService = inject(PerfumeService);
  private router = inject(Router);

  readonly stars = [1, 2, 3, 4, 5];

  // Reactive form with clientside validation
  perfumeForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    scentType: ['', Validators.required],
    price: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    description: ['', Validators.required],
    imageUrl: [''],

    gender: this.formBuilder.nonNullable.control<
      'Men' | 'Women' | 'Unisex' | ''
    >(
      '',
      Validators.required
    ),

    rating: [0, [
      Validators.required,
      Validators.min(1),
      Validators.max(5)
    ]]
  });

  setRating(rating: number): void {
    this.perfumeForm.controls.rating.setValue(rating);
  }

  // runs when the component loads
  // iff an id exists load that perfume and put its values into the form
  ngOnInit(): void {

    const id = this.id();

    // No id means we are adding a new perfume
    if (!id) {
      return;
    }

    // Get the existing perfume from the api
    this.perfumeService.getPerfumeById(id).subscribe({
      next: (perfume) => {

        // Fill the form with the existing perfume details
        this.perfumeForm.patchValue({
          name: perfume.name,
          brand: perfume.brand,
          scentType: perfume.scentType,
          price: perfume.price,
          description: perfume.description,
          imageUrl: perfume.imageUrl ?? '',
          gender: perfume.gender,
          rating: perfume.rating,
        });
      },

      error: (error) => {
        console.error('Error loading perfume:', error);
      }
    });
  }

  // Runms when the user submits the form
  onSubmit(): void {

    // Do not submit an invalid form
    if (this.perfumeForm.invalid) {
      return;
    }

    // get all values from the reactive form
    const {
      name,
      brand,
      scentType,
      price,
      description,
      gender,
      rating,
      imageUrl
    } = this.perfumeForm.getRawValue();

    
    if (!gender) {
      return;
    }

    // Create the object that will be sent to the api
    const perfumeData: CreatePerfumeDto = {
      name,
      brand,
      scentType,
      price,
      description,
      gender,
      rating,
      imageUrl: imageUrl || undefined
    };

    const id = this.id();

    // If an id exist update the perfume
    // Orcreate a new perfume
    const request = id
      ? this.perfumeService.updatePerfume(id, perfumeData)
      : this.perfumeService.addPerfume(perfumeData);

    // Send the hhto
    // p request
    request.subscribe({
      next: (response) => {
        console.log(
          id ? 'Perfume updated successfully:' : 'Perfume added successfully:',
          response
        );

        // Return to the perfum list after saving
        this.router.navigate(['/perfumes']);
      },

      error: (error) => {
        console.error(
          id ? 'Error updating perfume:' : 'Error adding perfume:',
          error
        );
      }
    });
  }
}