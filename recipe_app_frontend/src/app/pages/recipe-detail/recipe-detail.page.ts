import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="op-section">
      <div class="op-container" *ngIf="recipe as r">
        <div class="detail-header">
          <img class="cover" [src]="r.image" [alt]="r.title" />
          <div class="info">
            <h1>{{r.title}}</h1>
            <p class="muted">{{r.description}}</p>
            <div class="chips">
              <span *ngIf="r.cuisine" class="badge">{{r.cuisine}}</span>
              <span *ngIf="r.category" class="badge amber">{{r.category}}</span>
              <span *ngIf="r.prepTime">⏱ {{r.prepTime}}m</span>
              <span *ngIf="r.servings">🍽 {{r.servings}} servings</span>
            </div>
            <button class="op-btn" type="button" (click)="toggleFav()">
              {{ fav ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>
          </div>
        </div>

        <div class="content-grid">
          <section>
            <h2>Ingredients</h2>
            <ul class="list">
              <li *ngFor="let i of r.ingredients">{{i.amount ? (i.amount + ' ') : ''}}{{i.name}}</li>
            </ul>
          </section>

          <section>
            <h2>Instructions</h2>
            <ol class="list">
              <li *ngFor="let step of r.instructions">{{step}}</li>
            </ol>
          </section>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .detail-header{display:grid;grid-template-columns:360px 1fr;gap:1rem;align-items:start}
    .cover{width:100%;height:260px;object-fit:cover;border-radius:12px;border:1px solid var(--op-border)}
    .info h1{margin:0}
    .muted{color:var(--op-textMuted);margin:.25rem 0 1rem}
    .chips{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}
    .badge{background:var(--op-primaryA10);color:var(--op-primary);border:1px solid var(--op-primaryA20);padding:.1rem .4rem;border-radius:999px;font-size:.75rem}
    .badge.amber{background:var(--op-amberA10);color:var(--op-amber);border:1px solid var(--op-amberA20)}
    .content-grid{display:grid;grid-template-columns:1fr;gap:1.25rem;margin-top:1.5rem}
    .list{padding-left:1.1rem}
    @media (max-width:768px){.detail-header{grid-template-columns:1fr}.cover{height:220px}}
  `]
})
export class RecipeDetailPage {
  recipe: any;
  fav = false;

  constructor(private route: ActivatedRoute, private recipes: RecipeService, private favs: FavoritesService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.recipes.getRecipe(id).subscribe(r => {
      this.recipe = r;
      this.fav = this.favs.isFavorite(r.id);
    });
  }

  toggleFav() {
    if (!this.recipe?.id) return;
    this.favs.toggle(this.recipe.id);
    this.fav = this.favs.isFavorite(this.recipe.id);
  }
}
