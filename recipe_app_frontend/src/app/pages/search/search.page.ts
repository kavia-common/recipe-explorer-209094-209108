import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeService } from '../../services/recipe.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, FiltersComponent, PaginationComponent, RecipeCardComponent],
  template: `
    <section class="op-section">
      <div class="op-container">
        <h1 class="sr-only">Search Recipes</h1>
        <div class="toolbar">
          <app-search-bar [query]="q" (search)="onSearch($event)"></app-search-bar>
          <app-filters
            [cuisines]="cuisines"
            [categories]="categories"
            [(cuisine)]="cuisine"
            [(category)]="category"
            (change)="applyFilters($event)">
          </app-filters>
        </div>

        <p class="muted" *ngIf="total>0" aria-live="polite">{{total}} results</p>

        <div class="grid">
          <app-recipe-card *ngFor="let r of items" [recipe]="r"></app-recipe-card>
        </div>

        <app-pagination [page]="page" [pageSize]="pageSize" [total]="total" (pageChange)="changePage($event)"></app-pagination>
      </div>
    </section>
  `,
  styles: [`
    .toolbar{display:flex;flex-direction:column;gap:.75rem;margin-bottom:1rem}
    .muted{color:var(--op-textMuted);margin:.5rem 0}
    .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
    @media (max-width:1024px){.grid{grid-template-columns:repeat(3,1fr)}}
    @media (max-width:768px){.grid{grid-template-columns:repeat(2,1fr)}}
    @media (max-width:480px){.grid{grid-template-columns:1fr}}
  `]
})
export class SearchPage {
  q = '';
  cuisine = '';
  category = '';
  items: any[] = [];
  total = 0;
  page = 1;
  pageSize = 12;

  cuisines: string[] = ['Italian', 'Mexican', 'Indian', 'Chinese', 'American', 'Mediterranean'];
  categories: string[] = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Vegetarian'];

  constructor(private recipes: RecipeService) {}

  ngOnInit() {
    this.load();
  }

  onSearch(query: string) {
    this.q = query;
    this.page = 1;
    this.load();
  }

  applyFilters(filters: {cuisine: string; category: string}) {
    this.cuisine = filters.cuisine;
    this.category = filters.category;
    this.page = 1;
    this.load();
  }

  changePage(p: number) {
    this.page = p;
    this.load();
  }

  private load() {
    this.recipes.search({
      q: this.q,
      cuisine: this.cuisine || undefined,
      category: this.category || undefined,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe(res => {
      this.items = res.items;
      this.total = res.total;
      this.page = res.page;
      this.pageSize = res.pageSize;
    });
  }
}
