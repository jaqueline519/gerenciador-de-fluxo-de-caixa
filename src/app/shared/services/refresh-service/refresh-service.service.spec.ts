import { TestBed } from '@angular/core/testing';
import { RefreshListService } from './refresh-list.service';

describe('RefreshListService', () => {
  let service: RefreshListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshListService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve emitir e obter o valor de atualização da tabela', () => {
    const mockValue = 'fevereiro/2024';

    let valorEmitido: string | undefined;

    service.getRefreshTable().subscribe(valor => {
      valorEmitido = valor;
    });

    service.emitRefreshTable(mockValue);

    expect(valorEmitido).toEqual(mockValue);
  });
});
