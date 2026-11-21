import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private router = inject(Router);

  // controls the mobile menu
  menuOpen = signal(false);

  // open and the close burger menu
  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  // close menu after choosing a page
  closeMenu(): void {
    this.menuOpen.set(false);
  }

  // This check is an Angular frontend feature
  // The people can browse perfumes but adding a perfume
  // requires the user to be logged in
  goToAddPerfume(): void {

    const token =
      localStorage.getItem('token');

    if (!token) {

      this.closeMenu();

      this.router.navigate(['/login']);

      return;
    }

    this.closeMenu();

    this.router.navigate([
      '/perfumes/new'
    ]);
  }
  isLoggedIn(): boolean {
  return localStorage.getItem('token') !== null;
}

logout(): void {
  localStorage.removeItem('token');
  this.closeMenu();
  this.router.navigate(['/']);
}
}