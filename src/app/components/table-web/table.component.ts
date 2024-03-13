import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Registro } from 'src/app/shared/models/registros.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() registros: Registro[] = []
  @Input() disabledButton: boolean = false;
  @Output() editEvent: EventEmitter<Registro> = new EventEmitter();
  @Output() deletEvent: EventEmitter<Registro> = new EventEmitter();
  displayedColumns: string[] = ['descricao', 'entrada', 'saida', 'data', 'acoes'];


  constructor() { }

  ngOnInit(): void {
  }

  editarRegistro(registro: Registro) {
    this.editEvent.emit(registro)
  }

  deletarRegistro(registro: Registro) {
    this.deletEvent.emit(registro)
  }

}
