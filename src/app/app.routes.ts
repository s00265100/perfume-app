import { Routes } from '@angular/router';

import { Home } from './features/home/pages/home/home';

import { PerfumeList } from
  './features/perfumes/pages/perfume-list/perfume-list';

import { PerfumeForm } from
  './features/perfumes/pages/perfume-form/perfume-form';

import { PerfumeDetails } from
  './features/perfumes/pages/perfume-details/perfume-details';

import { Login } from
  './features/auth/pages/login/login';
import { About } from
  './features/about/pages/about/about';


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
  },

  {
    path: 'login',
    component: Login
  },
{
  path: 'about',
  component: About
}
];