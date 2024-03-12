import { Component } from '@angular/core';
import { Registro } from './models/registros.model';
import { RefreshTableService } from './services/refresh-table.service';

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

  submitForm(event: boolean) {
    this.typeSubmit = 'salvar'
    this.registro = {id: ''}
    this.refreshTableService.emitRefreshTable();
  }
}
