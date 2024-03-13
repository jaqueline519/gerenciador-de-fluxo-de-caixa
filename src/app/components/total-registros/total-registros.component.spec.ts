import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TotalRegistrosComponent } from './total-registros.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistroPipe } from 'src/app/shared/pipes/registro.pipe';

describe('TotalRegistrosComponent', () => {
  let component: TotalRegistrosComponent;
  let fixture: ComponentFixture<TotalRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalRegistrosComponent, RegistroPipe ],
      imports: [
          MatCardModule,
          MatGridListModule,
          MatTableModule,
          MatIconModule,
          MatToolbarModule,
          MatDialogModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar o método showCards após a visualização inicial', () => {
    spyOn(component, 'showCards');
    component.ngAfterViewInit();
    expect(component.showCards).toHaveBeenCalled();
  });

  it('deve calcular o saldo corretamente', () => {
    component.totalEntradasEsaidas = { entradas: 200, saidas: 100 };
    expect(component.retornaSaldo()).toEqual(100);
  });
});
