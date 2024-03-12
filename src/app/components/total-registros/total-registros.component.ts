import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { meses } from 'src/app/dictionary/meses-do-ano.dictionary';
import { EntradasSaidas } from 'src/app/types/entradas-saidas.type';
import { MesesDoAno } from 'src/app/types/meses-do-ano.type';

@Component({
  selector: 'app-total-registros',
  templateUrl: './total-registros.component.html',
  styleUrls: ['./total-registros.component.scss']
})
export class TotalRegistrosComponent implements OnInit {

  @Output() mesRegistroEvent = new EventEmitter<string>();
  @Input() totalEntradasEsaidas: EntradasSaidas = {entradas: 0, saidas: 0}
  mesAnoRegistro: string = '';
  displayedColumns: string[] = ['mes', 'entradas', 'saidas', 'saldo'];
  constructor() { }

  ngOnInit(): void {
    this.mesAnoRegistro = this.obterMesAnoAtual();
    this.mesRegistroEvent.emit(this.mesAnoRegistro);
  }

  obterMesAnoAtual(): string {
    const dataObj = new Date();
    const mesIndex = dataObj.getMonth();
    const ano: number = dataObj.getFullYear();
    const nomeMes: MesesDoAno = meses[mesIndex];
    return `${nomeMes}/${ano}`;
}

}
