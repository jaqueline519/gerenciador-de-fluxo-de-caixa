import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { meses } from 'src/app/dictionary/meses-do-ano.dictionary';
import { MesesDoAno } from 'src/app/types/meses-do-ano.type';

@Component({
  selector: 'app-total-registros',
  templateUrl: './total-registros.component.html',
  styleUrls: ['./total-registros.component.scss']
})
export class TotalRegistrosComponent implements OnInit {

  totalEntradas: number = 0;
  totalSaidas: number = 0;
  @Output() mesRegistroEvent = new EventEmitter<MesesDoAno>();
  mesRegistros: MesesDoAno = 'janeiro';
  displayedColumns: string[] = ['mes', 'entradas', 'saidas', 'saldo'];
  constructor() { }

  ngOnInit(): void {
    this.mesRegistros = this.obterMesAtual();
    this.mesRegistroEvent.emit(this.mesRegistros);
  }

  obterMesAtual(): MesesDoAno {
    const dataAtual = new Date();
    console.log(dataAtual);
    const mes = dataAtual.getMonth();
    return meses[mes];
  }
  

}
