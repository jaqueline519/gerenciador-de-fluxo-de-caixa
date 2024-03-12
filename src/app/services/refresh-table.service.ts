import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MesesDoAno } from '../types/meses-do-ano.type';

@Injectable({
  providedIn: 'root'
})
export class RefreshTableService {

  refreshTable$: BehaviorSubject<MesesDoAno> = new BehaviorSubject<MesesDoAno>('janeiro');
  constructor() { }

  getRefreshTable() {
    return this.refreshTable$.asObservable();
  }


  emitRefreshTable(mes: MesesDoAno) {
    this.refreshTable$.next(mes);
  }

}
