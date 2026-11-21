import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

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

  // controls the mobile menu
  menuOpen = signal(false);

  // open and close burger menu
  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  // close menu after choosing a page
  closeMenu(): void {
    this.menuOpen.set(false);
  }
}