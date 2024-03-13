import { Component } from '@angular/core';
import { EntradasSaidas } from './shared/types/entradas-saidas.type';
import { SnackbarService } from './shared/services/snackbar-service/snackbar.service';
import { RefreshListService } from './shared/services/refresh-service/refresh-list.service';
import { Registro } from './models/registros.model';

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
  dataNaoFormatada: string = '';
  openFormRegistro = false;
  
  constructor(private refreshListService: RefreshListService, private snackbarService: SnackbarService) {
  }
    
  editRegister(registro: Registro) {
    this.openForm('atualizar')
    this.registro = registro
  }

  submitForm(mesAno: string) {
    this.typeSubmit = 'salvar'
    this.registro = {id: ''}
    this.mesParaCarregarTabela(mesAno);
    this.openFormRegistro = false
  }

  emitDateNoFormmatter(date: string) {
    this.dataNaoFormatada = date;
  }

  mesParaCarregarTabela(mesAno: string) {
    this.refreshListService.emitRefreshTable(mesAno);
  }

  retornaTotalEntradasESaida(entradasESaidas: EntradasSaidas) {
    this.totalEntradasESaidas = entradasESaidas
  }

  openForm(typeSubmit: 'salvar' | 'atualizar') {
    this.typeSubmit = typeSubmit
    this.openFormRegistro = true
  }

  deveDesabilitarBotao(typeSubmit: 'salvar' | 'atualizar') {
    return this.typeSubmit === typeSubmit && this.openFormRegistro
  }

  closeForm(event: boolean) {
    console.log(event)
    if (event) {
      this.openFormRegistro = false;
    }
  }
  
}
