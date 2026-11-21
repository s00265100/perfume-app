import { Routes } from '@angular/router';
import { PerfumeList } from './features/perfumes/pages/perfume-list/perfume-list';
import { PerfumeDetails } from './features/perfumes/pages/perfume-details/perfume-details';
import { Home } from './features/home/pages/home/home';
import { PerfumeForm } from './features/perfumes/pages/perfume-form/perfume-form';


export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'perfumes',
    component: PerfumeList
  },
  {
    path: 'perfumes/new',
    component: PerfumeForm
  },
  {
    path: 'perfumes/:id/edit',
    component: PerfumeForm
  },
  {
    path: 'perfumes/:id',
    component: PerfumeDetails
  }
];