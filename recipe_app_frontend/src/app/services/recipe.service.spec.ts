import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipeService } from './recipe.service';
import { ConfigService } from './config.service';

class TestConfig extends ConfigService {
  override apiBase(): string { return ''; } // force mock
}

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(),
        RecipeService,
        { provide: ConfigService, useClass: TestConfig }
      ]
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should search using mock and paginate', (done) => {
    service.search({ q: 'p', page: 1, pageSize: 2 }).subscribe(res => {
      expect(res.items.length).toBe(2);
      expect(res.page).toBe(1);
      done();
    });

    const req = httpMock.expectOne('assets/mock/recipes.json');
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: '1', title: 'Pancakes', description: '', image: '', ingredients: [], instructions: [] },
      { id: '2', title: 'Pasta', description: '', image: '', ingredients: [], instructions: [] },
      { id: '3', title: 'Soup', description: '', image: '', ingredients: [], instructions: [] }
    ]);
  });
});
