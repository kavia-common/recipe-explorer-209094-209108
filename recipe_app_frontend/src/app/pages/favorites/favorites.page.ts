import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  template: `
    <section class="op-section">
      <div class="op-container">
        <h1>Favorites</h1>
        <p class="muted" *ngIf="ids.length===0">You haven't added any favorites yet.</p>
        <div class="grid" *ngIf="items.length">
          <app-recipe-card *ngFor="let r of items" [recipe]="r"></app-recipe-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .muted{color:var(--op-textMuted);margin:.5rem 0}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
    @media (max-width:1024px){.grid{grid-template-columns:repeat(3,1fr)}}
    @media (max-width:768px){.grid{grid-template-columns:repeat(2,1fr)}}
    @media (max-width:480px){.grid{grid-template-columns:1fr}}
  `]
})
export class FavoritesPage {
  ids: string[] = [];
  items: any[] = [];

  constructor(private favs: FavoritesService, private recipes: RecipeService) {}

  ngOnInit() {
    this.ids = this.favs.getAll();
    if (this.ids.length) {
      // fetch all and filter
      this.recipes.search({ page: 1, pageSize: 9999 }).subscribe(res => {
        const set = new Set(this.ids);
        this.items = res.items.filter(r => set.has(r.id));
      });
    }
  }
}
