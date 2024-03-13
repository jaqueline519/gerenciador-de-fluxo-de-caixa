import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrosFinanceirosService } from '../../shared/services/registros-financeiros-service/registros-financeiros.service';
import { EntradasSaidas } from 'src/app/shared/types/entradas-saidas.type';
import { RefreshListService } from 'src/app/shared/services/refresh-service/refresh-list.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Registro } from 'src/app/shared/models/registros.model';


@Component({
  selector: 'app-list-register',
  templateUrl: './list-register.component.html',
  styleUrls: ['./list-register.component.scss']
})
export class ListRegisterComponent implements OnInit {
  
  @Input() disabledButton: boolean = false;
  @Output() editRegister: EventEmitter<Registro> = new EventEmitter();
  @Output() emiteTotalEntradasESaidas: EventEmitter<EntradasSaidas> = new EventEmitter();
  registros: Registro[] = [];
  isMobile = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private registrosFinanceirosService: RegistrosFinanceirosService,
    private refreshListService: RefreshListService) { }


  ngOnInit(): void {
    this.buscarTodosOsRegistros();
    this.observaMudancaParaRefresh();
    this.observaMudancatamanhoTela();
  }

  observaMudancaParaRefresh(){
    this.refreshListService.getRefreshTable().subscribe({
      next: (response) => {
          console.log( 'response table',response);
          this.buscarRegistrosPorMes(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  observaMudancatamanhoTela(){
    this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches)
    )
    .subscribe(matches => {
      this.isMobile = matches;
    });
}

  buscarRegistrosPorMes(mesAno: string) {
    this.registrosFinanceirosService.buscarTodosOsRegistrosDoMesNoAno(mesAno).subscribe({
      next: (response: Registro[]) => {
        const entradas = this.retornaApenasEntradas(response);
        const saidas = this.retornaApenasSaidas(response);
        const totalEntradas = this.somaValorTotal(entradas as number[]);
        const totalSaidas = this.somaValorTotal(saidas as number[]);
        this.emiteTotalEntradasESaidas.emit({
          entradas: totalEntradas,
          saidas: totalSaidas
        });
        this.registros = response;
      },
      error: (error: Error) => {
        console.log(error);
      }
    })
  }

  retornaApenasEntradas(registros: Registro[]) {
    return registros.map(registro => registro.tipoDeRegistro === 'entrada' && registro.valor);
  }

  retornaApenasSaidas(registros: Registro[]) {
    return registros.map(registro => registro.tipoDeRegistro === 'saida' && registro.valor);
  }

  somaValorTotal(valores: number[]) {
    let total = 0;
    valores.forEach((valor) => {
      total += valor;
    });
    return total;
  }

  buscarTodosOsRegistros() {
    this.registrosFinanceirosService.buscarTodosOsRegistros().subscribe({
      next: (response) => {
        this.registros = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editarRegistro(registro: Registro) {
    this.editRegister.emit(registro);
  }

  deletarRegistro(registro: Registro) {
    this.registrosFinanceirosService.deletarRegistro(registro).subscribe({
      next: (response) => {
        this.buscarTodosOsRegistros();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
