import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Perfume } from '../../models/perfume.model';

@Component({
  selector: 'app-perfume-card',
  imports: [RouterLink],
  templateUrl: './perfume-card.html',
  styleUrl: './perfume-card.css'
})
export class PerfumeCard {

  perfume = input.required<Perfume>();

}