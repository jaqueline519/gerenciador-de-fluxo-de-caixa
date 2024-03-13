import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  private posicaoHorizontal: MatSnackBarHorizontalPosition = 'end';
  private posicaoVertical: MatSnackBarVerticalPosition = 'top';

  constructor(private  snackBar: MatSnackBar){

  }

  abrirSnackBar(valueSnackBar: string) {
    this.snackBar.open(valueSnackBar, 'ok', {
      horizontalPosition: this.posicaoHorizontal,
      verticalPosition: this.posicaoVertical,
    });

}
}
