import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="op-shell" role="banner">
      <div class="op-container header-inner">
        <a class="brand" routerLink="/" aria-label="Recipe Explorer Home">
          <span class="logo" aria-hidden="true">🍳</span>
          <span class="brand-text">Recipe Explorer</span>
        </a>
        <nav aria-label="Primary" class="nav">
          <a routerLink="/" class="nav-link">Home</a>
          <a routerLink="/search" class="nav-link">Search</a>
          <a routerLink="/favorites" class="nav-link">Favorites</a>
        </nav>
        <div class="header-actions">
          <ng-content select="[header-search]"></ng-content>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header-inner{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0;}
    .brand{display:flex;gap:.5rem;align-items:center;color:var(--op-text);text-decoration:none;font-weight:600;}
    .logo{font-size:1.25rem}
    .nav{display:flex;gap:1rem}
    .nav-link{color:var(--op-text);text-decoration:none;padding:.25rem .5rem;border-radius:.375rem}
    .nav-link:hover,.nav-link:focus{outline:none;background:var(--op-surfaceElev);box-shadow:0 0 0 2px var(--op-primaryA10) inset}
    .header-actions{display:flex;gap:.5rem;align-items:center}
    @media (max-width:768px){.nav{display:none}}
  `]
})
export class HeaderComponent {
  @Input() title = 'Recipe Explorer';
}
