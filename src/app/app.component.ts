import { Component } from '@angular/core';
import { Registro } from './models/registros.model';
import { RefreshTableService } from './services/refresh-table.service';
import { MesesDoAno } from './types/meses-do-ano.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  registro: Registro = {id: ''}
  typeSubmit: 'salvar' | 'atualizar' = 'salvar'
  title = 'fluxo-de-caixa';
  
  constructor(private refreshTableService: RefreshTableService) {
    
  }
  editRegister(registro: Registro) {
    this.typeSubmit = 'atualizar'
    this.registro = registro
  }

  submitForm(mes: MesesDoAno) {
    this.typeSubmit = 'salvar'
    this.registro = {id: ''}
    this.mesParaCarregarTabela(mes);
  }

  mesParaCarregarTabela(mes: MesesDoAno) {
    this.refreshTableService.emitRefreshTable(mes);
  }
}
