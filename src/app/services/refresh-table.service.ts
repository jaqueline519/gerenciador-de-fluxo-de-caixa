import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTableService {

  refreshTable$: BehaviorSubject<string> = new BehaviorSubject<string>('janeiro/2024');
  constructor() { }

  getRefreshTable() {
    return this.refreshTable$.asObservable();
  }


  emitRefreshTable(mes: string) {
    this.refreshTable$.next(mes);
  }

}
