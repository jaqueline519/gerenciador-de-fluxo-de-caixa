import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshTableService {

  refreshTable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  constructor() { }

  getRefreshTable() {
    return this.refreshTable$.asObservable();
  }

  emitRefreshTable() {
    this.refreshTable$.next(true);
  }
}
