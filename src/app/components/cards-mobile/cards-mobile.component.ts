import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Registro } from 'src/app/shared/models/registros.model';


@Component({
  selector: 'app-cards-mobile',
  templateUrl: './cards-mobile.component.html',
  styleUrls: ['./cards-mobile.component.scss']
})
export class CardsMobileComponent implements OnInit {

  @Input() registros: Registro[] = []
  @Input() disabledButton: boolean = false;
  @Output() editEvent: EventEmitter<Registro> = new EventEmitter();
  @Output() deletEvent: EventEmitter<Registro> = new EventEmitter();

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
