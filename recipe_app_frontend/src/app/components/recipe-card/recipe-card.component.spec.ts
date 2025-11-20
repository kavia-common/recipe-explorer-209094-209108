import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeCardComponent } from './recipe-card.component';
import { FavoritesService } from '../../services/favorites.service';

class FavStub {
  private set = new Set<string>();
  toggle(id: string){ this.set.has(id) ? this.set.delete(id) : this.set.add(id); }
  isFavorite(id: string){ return this.set.has(id); }
}

describe('RecipeCardComponent', () => {
  let component: RecipeCardComponent;
  let fixture: ComponentFixture<RecipeCardComponent>;
  let favs: FavStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeCardComponent],
      providers: [{ provide: FavoritesService, useClass: FavStub }]
    }).compileComponents();

    favs = TestBed.inject(FavoritesService) as any;
    fixture = TestBed.createComponent(RecipeCardComponent);
    component = fixture.componentInstance;
    component.recipe = { id: '1', title: 'Test', description: '', image: '', ingredients: [], instructions: [] };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggles favorite state', () => {
    expect(component.isFav).toBeFalse();
    component.toggleFavorite({ preventDefault(){}, stopPropagation(){} } as any);
    expect(component.isFav).toBeTrue();
    component.toggleFavorite({ preventDefault(){}, stopPropagation(){} } as any);
    expect(component.isFav).toBeFalse();
  });
});
