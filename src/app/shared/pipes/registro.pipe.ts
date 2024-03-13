import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'registroPipe'
})
export class RegistroPipe implements PipeTransform {

  transform(tipoDeRegistro: string, valor: number): string {
    if ((tipoDeRegistro === 'entradas' && valor > 0) || (tipoDeRegistro === 'saldo' && valor > 0)) {
      return 'entryies';
    } else if (tipoDeRegistro === 'saidas' || (tipoDeRegistro === 'saldo' && valor < 0)) {
      return 'money-off';
    } else {
      return 'money';
    }
  }
}
