import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  apiUrl = environment.openFoodApi
  constructor(private http: HttpClient) { }

  getProductData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/737628064502.json`).pipe(
      map(response => response.product.categories.split(','))
    )
  }
}
