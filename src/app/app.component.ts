import { Component } from '@angular/core';
import { Registro } from './models/registros.model';
import { RefreshTableService } from './services/refresh-table.service';
import { EntradasSaidas } from './types/entradas-saidas.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  registro: Registro = {id: ''}
  typeSubmit: 'salvar' | 'atualizar' = 'salvar'
  title = 'fluxo-de-caixa';
  totalEntradasESaidas: EntradasSaidas = {entradas: 0, saidas: 0}
  
  constructor(private refreshTableService: RefreshTableService) {
    
  }
  editRegister(registro: Registro) {
    this.typeSubmit = 'atualizar'
    this.registro = registro
  }

  submitForm(mesAno: string) {
    this.typeSubmit = 'salvar'
    this.registro = {id: ''}
    this.mesParaCarregarTabela(mesAno);
  }

  mesParaCarregarTabela(mesAno: string) {
    this.refreshTableService.emitRefreshTable(mesAno);
  }

  retornaTotalEntradasESaida(entradasESaidas: EntradasSaidas) {
    this.totalEntradasESaidas = entradasESaidas
  }
}
