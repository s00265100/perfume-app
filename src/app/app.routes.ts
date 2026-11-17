import { Routes } from '@angular/router';
import { PerfumeList } from './features/perfumes/pages/perfume-list/perfume-list';
import { PerfumeDetails } from './features/perfumes/pages/perfume-details/perfume-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfumes',
    pathMatch: 'full'
  },
  {
    path: 'perfumes',
    component: PerfumeList
  },
  {
    path: 'perfumes/:id',
    component: PerfumeDetails
  }
];