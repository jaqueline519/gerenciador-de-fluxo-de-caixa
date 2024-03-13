import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshListService {

  refreshTable$: BehaviorSubject<string> = new BehaviorSubject<string>('janeiro/2024');
  constructor() { }

  getRefreshTable() {
    return this.refreshTable$.asObservable();
  }


  emitRefreshTable(mesAno: string) {
    this.refreshTable$.next(mesAno);
  }

}
