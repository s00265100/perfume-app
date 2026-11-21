import {
  Component,
  inject
} from '@angular/core';

import {
  Router,
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-home',

  imports: [
    RouterLink
  ],

  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  private router = inject(Router);

  // The perfume list stays public
  // Only adding a perfume checks whether the user has logged 
  goToAddPerfume(): void {

    const token =
      localStorage.getItem('token');

    if (!token) {

      this.router.navigate(['/login']);

      return;
    }

    this.router.navigate([
      '/perfumes/new'
    ]);
  }
}