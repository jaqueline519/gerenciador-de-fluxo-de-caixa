import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegistrosFinanceirosService } from '../../services/registros-financeiros.service';
import { Registro } from '../../models/registros.model';
import { RefreshTableService } from 'src/app/services/refresh-table.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  
  registros: Registro[] = [];
  @Output() editRegister: EventEmitter<Registro> = new EventEmitter();
  constructor(private registrosFinanceirosService: RegistrosFinanceirosService,
    private refreshTableService: RefreshTableService) { }


  ngOnInit(): void {
    this.buscarTodosOsRegistros();
    this.refreshTableService.getRefreshTable().subscribe({
      next: (response) => {
        this.buscarTodosOsRegistros();
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
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
