import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegistrosFinanceirosService } from '../../services/registros-financeiros-service/registros-financeiros.service';
import { Registro } from '../../models/registros.model';
import { EntradasSaidas } from 'src/app/types/entradas-saidas.type';
import { RefreshTableService } from 'src/app/services/refresh-service/refresh-table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  @Output() editRegister: EventEmitter<Registro> = new EventEmitter();
  @Output() emiteTotalEntradasESaidas: EventEmitter<EntradasSaidas> = new EventEmitter();
  registros: Registro[] = [];
  displayedColumns: string[] = ['descricao', 'entrada', 'saida', 'data', 'acoes'];
  constructor(private registrosFinanceirosService: RegistrosFinanceirosService,
    private refreshTableService: RefreshTableService) { }


  ngOnInit(): void {
    this.buscarTodosOsRegistros();
    this.refreshTableService.getRefreshTable().subscribe({
      next: (response) => {
          console.log( 'response table',response);
          this.buscarRegistrosPorMes(response);
      },
      error: (error) => {
        console.log(error);
      }
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
    // TODO: Implementar a edição e formulário
    this.editRegister.emit(registro);
    console.log(registro);
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
