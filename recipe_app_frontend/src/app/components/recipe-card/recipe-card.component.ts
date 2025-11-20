import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article class="recipe-card op-surface">
      <a [routerLink]="['/recipe', recipe?.id]" class="image-link" [attr.aria-label]="recipe?.title">
        <img class="recipe-img" [src]="recipe?.image" [alt]="recipe?.title || 'Recipe image'">
      </a>
      <div class="card-body">
        <h3 class="card-title">
          <a [routerLink]="['/recipe', recipe?.id]" class="card-link">{{recipe?.title}}</a>
        </h3>
        <p class="card-desc">{{recipe?.description}}</p>
        <div class="meta">
          <span *ngIf="recipe?.cuisine" class="badge">{{recipe?.cuisine}}</span>
          <span *ngIf="recipe?.category" class="badge amber">{{recipe?.category}}</span>
          <span *ngIf="recipe?.prepTime">⏱ {{recipe?.prepTime}}m</span>
        </div>
      </div>
      <button type="button"
              class="fav-btn"
              [attr.aria-pressed]="isFav ? 'true' : 'false'"
              [attr.aria-label]="isFav ? 'Remove from favorites' : 'Add to favorites'"
              (click)="toggleFavorite($event)">
        <span [class.filled]="isFav" aria-hidden="true">★</span>
      </button>
    </article>
  `,
  styles: [`
    .recipe-card{position:relative;border:1px solid var(--op-border);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
    .image-link{display:block}
    .recipe-img{width:100%;height:180px;object-fit:cover;background:#eef2ff}
    .card-body{padding:.75rem .75rem 1rem}
    .card-title{font-size:1rem;margin:0 0 .25rem}
    .card-link{text-decoration:none;color:var(--op-text)}
    .card-link:hover,.card-link:focus{outline:none;text-decoration:underline}
    .card-desc{font-size:.9rem;color:var(--op-textMuted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .meta{display:flex;gap:.5rem;align-items:center;margin-top:.5rem;color:var(--op-textMuted);font-size:.85rem;flex-wrap:wrap}
    .badge{background:var(--op-primaryA10);color:var(--op-primary);border:1px solid var(--op-primaryA20);padding:.1rem .4rem;border-radius:999px;font-size:.75rem}
    .badge.amber{background:var(--op-amberA10);color:var(--op-amber);border:1px solid var(--op-amberA20)}
    .fav-btn{position:absolute;top:.5rem;right:.5rem;background:var(--op-surfaceElev);border:1px solid var(--op-border);border-radius:999px;padding:.35rem .45rem;cursor:pointer}
    .fav-btn:hover,.fav-btn:focus{outline:none;box-shadow:0 0 0 2px var(--op-primaryA20)}
    .fav-btn span{color:var(--op-textMuted);font-size:1rem}
    .fav-btn .filled{color:var(--op-amber)}
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  isFav = false;

  constructor(private favs: FavoritesService) {}

  ngOnInit() {
    if (this.recipe?.id) this.isFav = this.favs.isFavorite(this.recipe.id);
  }

  toggleFavorite(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.recipe?.id) return;
    this.favs.toggle(this.recipe.id);
    this.isFav = this.favs.isFavorite(this.recipe.id);
  }
}
