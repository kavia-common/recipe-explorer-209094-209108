import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { ConfigService } from './config.service';

export interface RecipeQuery {
  q?: string;
  cuisine?: string;
  category?: string;
  page?: number;
  pageSize?: number;
  tags?: string[];
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * PUBLIC_INTERFACE
 * Service to fetch recipes from API with fallback to local mock JSON.
 */
@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly mockUrl = 'assets/mock/recipes.json';

  constructor(private http: HttpClient, private config: ConfigService) {}

  // PUBLIC_INTERFACE
  getRecipe(id: string) {
    /** Retrieves a single recipe by id, with mock fallback. */
    const apiBase = this.config.apiBase();
    if (apiBase) {
      return this.http.get<Recipe>(`${apiBase}/recipes/${id}`).pipe(
        catchError(() => this.http.get<Recipe[]>(this.mockUrl).pipe(
          map(list => list.find(r => r.id === id)!),
        ))
      );
    }
    return this.http.get<Recipe[]>(this.mockUrl).pipe(map(list => list.find(r => r.id === id)!));
  }

  // PUBLIC_INTERFACE
  search(query: RecipeQuery) {
    /** Searches recipes, returns paginated results. Falls back to client-side filtering with mock data. */
    const page = Math.max(1, query.page || 1);
    const pageSize = Math.min(50, Math.max(1, query.pageSize || 12));
    const apiBase = this.config.apiBase();

    if (apiBase) {
      // If API exists, try server search.
      let params = new HttpParams()
        .set('page', String(page))
        .set('pageSize', String(pageSize));
      if (query.q) params = params.set('q', query.q);
      if (query.cuisine) params = params.set('cuisine', query.cuisine);
      if (query.category) params = params.set('category', query.category);
      if (query.tags?.length) params = params.set('tags', query.tags.join(','));

      return this.http.get<PagedResult<Recipe>>(`${apiBase}/recipes/search`, { params }).pipe(
        catchError(() => this.clientSearch(query))
      );
    }

    return this.clientSearch(query);
  }

  private clientSearch(query: RecipeQuery) {
    const page = Math.max(1, query.page || 1);
    const pageSize = Math.min(50, Math.max(1, query.pageSize || 12));
    return this.http.get<Recipe[]>(this.mockUrl).pipe(
      map(all => {
        let filtered = all.slice();
        const q = (query.q || '').toLowerCase().trim();
        if (q) {
          filtered = filtered.filter(r =>
            r.title.toLowerCase().includes(q) ||
            r.description.toLowerCase().includes(q) ||
            (r.tags || []).some(t => t.toLowerCase().includes(q)) ||
            r.ingredients.some(i => i.name.toLowerCase().includes(q))
          );
        }
        if (query.cuisine) {
          filtered = filtered.filter(r => (r.cuisine || '').toLowerCase() === query.cuisine!.toLowerCase());
        }
        if (query.category) {
          filtered = filtered.filter(r => (r.category || '').toLowerCase() === query.category!.toLowerCase());
        }
        if (query.tags?.length) {
          const req = query.tags.map(t => t.toLowerCase());
          filtered = filtered.filter(r => req.every(t => (r.tags || []).map(x => x.toLowerCase()).includes(t)));
        }

        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const items = filtered.slice(start, start + pageSize);
        return { items, total, page, pageSize } as PagedResult<Recipe>;
      })
    );
  }
}
