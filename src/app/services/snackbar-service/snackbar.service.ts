import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { tipoSnackbar } from "src/app/types/snackbar.type";

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  private posicaoHorizontal: MatSnackBarHorizontalPosition = 'end';
  private posicaoVertical: MatSnackBarVerticalPosition = 'top';

  constructor(private  snackBar: MatSnackBar){

  }

  abrirSnackBar(valueSnackBar: string, tipoDeAcao: tipoSnackbar) {
    this.snackBar.open(`successfully ${tipoDeAcao}: ${valueSnackBar}`, 'ok', {
      horizontalPosition: this.posicaoHorizontal,
      verticalPosition: this.posicaoVertical,
    });

}
}
