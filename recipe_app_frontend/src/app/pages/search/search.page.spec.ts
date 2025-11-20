import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPage } from './search.page';
import { RecipeService, PagedResult } from '../../services/recipe.service';
import { of } from 'rxjs';

class RecipeServiceStub {
  search() {
    const data: PagedResult<any> = { items: [{ id: '1', title: 'A', description:'', image:'', ingredients:[], instructions:[] }], total: 1, page: 1, pageSize: 12 };
    return of(data);
  }
}

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [{ provide: RecipeService, useClass: RecipeServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads results on init', () => {
    expect(component.items.length).toBe(1);
    expect(component.total).toBe(1);
  });
});
