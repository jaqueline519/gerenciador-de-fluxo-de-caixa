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
import { EntradasSaidas } from "src/app/shared/types/entradas-saidas.type";

@Component({
  selector: "app-total-registros",
  templateUrl: "./total-registros.component.html",
  styleUrls: ["./total-registros.component.scss"]
})
export class TotalRegistrosComponent implements OnInit, AfterViewInit {
  @Output() mesRegistroEvent = new EventEmitter<string>();
  @Input() totalEntradasEsaidas: EntradasSaidas = { entradas: 0, saidas: 0 };
  @ViewChild("cardContainer") cardContainer!: ElementRef;
  mesAnoRegistro: string = "";
  displayedColumns: string[] = ["entradas", "saidas", "saldo"];
  openSelectDate = false;

  constructor() {}
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showCards();
  }

  showCards() {
    setTimeout(() => {
      this.cardContainer.nativeElement.classList.add("slide-down");
    }, 100);
  }

  retornaSaldo(){
    return this.totalEntradasEsaidas.entradas - this.totalEntradasEsaidas.saidas
  }

}
