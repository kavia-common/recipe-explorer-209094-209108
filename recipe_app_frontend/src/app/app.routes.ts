import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SearchPage } from './pages/search/search.page';
import { RecipeDetailPage } from './pages/recipe-detail/recipe-detail.page';
import { FavoritesPage } from './pages/favorites/favorites.page';
import { featureEnabledGuard } from './guards/feature-flags.guard';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Recipe Explorer - Home' },
  { path: 'search', component: SearchPage, title: 'Recipe Explorer - Search' },
  { path: 'recipe/:id', component: RecipeDetailPage, title: 'Recipe - Details' },
  {
    path: 'favorites',
    component: FavoritesPage,
    title: 'Recipe Explorer - Favorites',
    canActivate: [featureEnabledGuard('favorites')]
  },
  { path: '**', redirectTo: '' }
];
