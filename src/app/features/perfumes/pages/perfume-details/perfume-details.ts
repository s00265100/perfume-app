import { Component, inject, input, signal } from '@angular/core';

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

  readonly id = input.required<string>();

  readonly perfume = signal<Perfume | null>(null);

  ngOnInit(): void {
    this.perfumeService.getPerfumeById(this.id()).subscribe(perfume => {
      this.perfume.set(perfume);
    });
  }
}
