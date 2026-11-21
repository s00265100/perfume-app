import { Component, inject, input, signal } from '@angular/core';
import {  Router } from '@angular/router';

import { Perfume } from '../../models/perfume.model';
import { PerfumeService } from '../../services/perfume.service';

@Component({
  selector: 'app-perfume-details',
  imports: [],
  templateUrl: './perfume-details.html',
  styleUrl: './perfume-details.css'
})
export class PerfumeDetails {

  
  private perfumeService = inject(PerfumeService);

  // router is used after deletting so we can go back to perfume list
  private router = inject(Router);

  // gets the perfume id from the url
  readonly id = input.required<string>();

  // store the perfume that comes back from the api
  readonly perfume = signal<Perfume | null>(null);

  // when page loads get the perfume using the id
  ngOnInit(): void {

    this.perfumeService.getPerfumeById(this.id()).subscribe(perfume => {

      // save the returns perfume in the signal
      this.perfume.set(perfume);

    });
  }
// Perfume details can be view by anyone
// but editing require the user to have logged in
goToEdit(): void {

  const token =
    localStorage.getItem('token');

  if (!token) {

    this.router.navigate(['/login']);

    return;
  }

  this.router.navigate([
    '/perfumes',
    this.id(),
    'edit'
  ]);
}
  
  deletePerfume(): void {

  // Deleting is restricted on the Angular side.
  // If there is no JWT in the browser the user is sent to Login.
  const token =
    localStorage.getItem('token');

  if (!token) {

    this.router.navigate(['/login']);

    return;
  }

  const id = this.id();

  if (
    !confirm(
      'Are you sure you want to delete this perfume?'
    )
  ) {

    return;
  }

  this.perfumeService
    .deletePerfume(id)
    .subscribe({

      next: () => {

        console.log(
          'Perfume deleted succesfully'
        );

        this.router.navigate([
          '/perfumes'
        ]);
      },

      error: error => {

        console.error(
          'Error deleting perfume:',
          error
        );
      }

    });
}
}