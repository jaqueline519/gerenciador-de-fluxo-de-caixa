import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriasService } from './categorias.service';
import { environment } from 'src/environments/environment';

describe('CategoriasService', () => {
  let service: CategoriasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriasService]
    });
    service = TestBed.inject(CategoriasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar categorias', () => {
    const mockCategories = 'lanches,bebidas,doces';

    service.getProductData().subscribe(categorias => {
      expect(categorias).toEqual(mockCategories.split(','));
    });

    const req = httpMock.expectOne(`${environment.openFoodApi}/737628064502.json`);
    expect(req.request.method).toBe('GET');

    req.flush({ product: { categories: mockCategories } });
  });
});
