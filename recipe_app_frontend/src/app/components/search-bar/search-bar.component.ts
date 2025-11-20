import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="submit()" class="search-form" role="search" aria-label="Recipe search">
      <label class="sr-only" for="query">Search recipes</label>
      <input id="query" name="query" [(ngModel)]="query" [placeholder]="placeholder"
             class="op-input" type="search" />
      <button type="submit" class="op-btn">Search</button>
    </form>
  `,
  styles: [`
    .search-form{display:flex;gap:.5rem;align-items:center;width:100%}
    .op-input{flex:1}
  `]
})
export class SearchBarComponent {
  @Input() placeholder = 'Search recipes, ingredients, tags...';
  @Input() query = '';
  @Output() search = new EventEmitter<string>();
  submit() { this.search.emit((this.query || '').trim()); }
}
