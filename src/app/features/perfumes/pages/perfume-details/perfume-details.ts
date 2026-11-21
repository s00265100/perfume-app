import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { Perfume } from '../../models/perfume.model';
import { PerfumeService } from '../../services/perfume.service';

@Component({
  selector: 'app-perfume-details',
  imports: [RouterLink],
  templateUrl: './perfume-details.html',
  styleUrl: './perfume-details.css'
})
export class PerfumeDetails {

  // getting access to the perfume service
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

  // delete the perfume
  deletePerfume(): void {

    const id = this.id();

    // ask first incase user clicked delete by mistake
    if (!confirm('Are you sure you want to delete this perfume?')) {
      return;
    }

    // call delete from perfume service
    this.perfumeService.deletePerfume(id).subscribe({

      next: () => {

        console.log('Perfume deleted succesfully');

        // go back to perfume list once its deleted
        this.router.navigate(['/perfumes']);
      },

      error: (error) => {

        // show error in console if deleting fails
        console.error('Error deleting perfume:', error);
      }

    });
  }
}