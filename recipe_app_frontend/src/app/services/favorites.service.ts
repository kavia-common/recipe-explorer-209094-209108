import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

/**
 * PUBLIC_INTERFACE
 * Manages user's favorite recipes with SSR safety (no direct storage access on server).
 */
@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storageKey = 'recipe_favorites';
  private readonly _ids$ = new BehaviorSubject<Set<string>>(new Set<string>());

  readonly ids$ = this._ids$.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const ls = (globalThis as any)?.localStorage as Storage | undefined;
        const raw = ls?.getItem(this.storageKey);
        if (raw) {
          const arr = JSON.parse(raw) as string[];
          this._ids$.next(new Set(arr));
        }
      } catch {
        // ignore
      }
    }
  }

  // PUBLIC_INTERFACE
  toggle(id: string) {
    /** Toggles a recipe id in favorites. */
    const set = new Set(this._ids$.value);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    this._ids$.next(set);
    this.persist();
  }

  // PUBLIC_INTERFACE
  isFavorite(id: string): boolean {
    /** Returns true if the id is currently a favorite. */
    return this._ids$.value.has(id);
  }

  // PUBLIC_INTERFACE
  getAll(): string[] {
    /** Returns a list of all favorite recipe IDs. */
    return Array.from(this._ids$.value);
  }

  private persist() {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const ls = (globalThis as any)?.localStorage as Storage | undefined;
        ls?.setItem(this.storageKey, JSON.stringify(this.getAll()));
      } catch {
        // ignore
      }
    }
  }
}
