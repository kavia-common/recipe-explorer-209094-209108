import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RecipeCardComponent],
  template: `
    <section class="op-hero">
      <div class="op-container">
        <h1>Discover Delicious Recipes</h1>
        <p class="lead">Browse curated picks or search thousands of dishes.</p>
        <a routerLink="/search" class="op-btn">Start exploring</a>
      </div>
    </section>

    <section class="op-section">
      <div class="op-container">
        <h2 class="section-title">Featured</h2>
        <div class="grid">
          <app-recipe-card *ngFor="let r of featured" [recipe]="r"></app-recipe-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .lead{color:var(--op-textMuted);margin:.25rem 0 1rem}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
    @media (max-width:1024px){.grid{grid-template-columns:repeat(3,1fr)}}
    @media (max-width:768px){.grid{grid-template-columns:repeat(2,1fr)}}
    @media (max-width:480px){.grid{grid-template-columns:1fr}}
  `]
})
export class HomePage {
  featured: any[] = [];
  constructor(private recipes: RecipeService) {}
  ngOnInit() {
    this.recipes.search({ page: 1, pageSize: 8 }).subscribe(res => this.featured = res.items);
  }
}
