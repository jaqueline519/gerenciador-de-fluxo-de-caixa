import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { meses } from "src/app/dictionary/meses-do-ano.dictionary";
import { EntradasSaidas } from "src/app/types/entradas-saidas.type";
import { MesesDoAno } from "src/app/types/meses-do-ano.type";

@Component({
  selector: "app-total-registros",
  templateUrl: "./total-registros.component.html",
  styleUrls: ["./total-registros.component.scss"],
})
export class TotalRegistrosComponent implements OnInit, AfterViewInit {
  @Output() mesRegistroEvent = new EventEmitter<string>();
  @Input() totalEntradasEsaidas: EntradasSaidas = { entradas: 0, saidas: 0 };
  @ViewChild("cardContainer") cardContainer!: ElementRef;
  mesAnoRegistro: string = "";
  displayedColumns: string[] = ["mes", "entradas", "saidas", "saldo"];

  constructor() {}
  ngOnInit(): void {
    this.mesAnoRegistro = this.obterMesAnoAtual();
    this.mesRegistroEvent.emit(this.mesAnoRegistro);
  }

  ngAfterViewInit(): void {
    this.showCards();
  }

  obterMesAnoAtual(): string {
    const dataObj = new Date();
    const mesIndex = dataObj.getMonth();
    const ano: number = dataObj.getFullYear();
    const nomeMes: MesesDoAno = meses[mesIndex];
    return `${nomeMes}/${ano}`;
  }

  showCards() {
    setTimeout(() => {
      this.cardContainer.nativeElement.classList.add("slide-down");
    }, 100);
  }
}
