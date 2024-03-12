import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-registros',
  templateUrl: './total-registros.component.html',
  styleUrls: ['./total-registros.component.scss']
})
export class TotalRegistrosComponent implements OnInit {

  totalEntradas: number = 0;
  totalSaidas: number = 0;
  mesRegistros: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
