import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="filters" role="region" aria-label="Filters">
      <label>
        <span class="sr-only">Cuisine</span>
        <select class="op-select" [(ngModel)]="cuisine" (ngModelChange)="onCuisineChange($event)">
          <option value="">All cuisines</option>
          <option *ngFor="let c of cuisines" [value]="c">{{c}}</option>
        </select>
      </label>
      <label>
        <span class="sr-only">Category</span>
        <select class="op-select" [(ngModel)]="category" (ngModelChange)="onCategoryChange($event)">
          <option value="">All categories</option>
          <option *ngFor="let c of categories" [value]="c">{{c}}</option>
        </select>
      </label>
    </div>
  `,
  styles: [`
    .filters{display:flex;gap:.5rem;flex-wrap:wrap}
  `]
})
export class FiltersComponent {
  @Input() cuisines: string[] = [];
  @Input() categories: string[] = [];
  @Input() cuisine = '';
  @Output() cuisineChange = new EventEmitter<string>();
  @Input() category = '';
  @Output() categoryChange = new EventEmitter<string>();
  @Output() change = new EventEmitter<{cuisine: string; category: string}>();

  onCuisineChange(val: string) {
    this.cuisine = val || '';
    this.cuisineChange.emit(this.cuisine);
    this.emitCombined();
  }
  onCategoryChange(val: string) {
    this.category = val || '';
    this.categoryChange.emit(this.category);
    this.emitCombined();
  }
  private emitCombined() { this.change.emit({ cuisine: this.cuisine, category: this.category }); }
}
