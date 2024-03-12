import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/registros.model';
import { environment } from 'src/environments/environment';
import { meses } from '../dictionary/meses-do-ano.dictionary';
import { MesesDoAno } from '../types/meses-do-ano.type';

@Injectable({
  providedIn: 'root'
})
export class RegistrosFinanceirosService {

  baseUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  buscarTodosOsRegistros(): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.baseUrl}/transacoes`);
  }

  buscarRegistroPorId(id: number): Observable<Registro> {
    return this.http.get<Registro>(`${this.baseUrl}/transacoes/${id}`);
  }

  buscarTodosOsRegistrosDoMesNoAno(mesAno: string): Observable<Registro[]> {
    return this.http.get<Registro[]>(`${this.baseUrl}/transacoes?mesAno=${mesAno}`);
  }

  adicionarRegistro(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(`${this.baseUrl}/transacoes`, registro);
  }

  atualizarRegistro(registro: Registro): Observable<Registro> {
    return this.http.put<Registro>(`${this.baseUrl}/transacoes/${registro.id}`, registro);
  }

  deletarRegistro(registro: Registro): Observable<Registro> {
    return this.http.delete<Registro>(`${this.baseUrl}/transacoes/${registro.id}`);
  }
}
