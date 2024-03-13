import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from "moment";
import { FormControl } from "@angular/forms";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import { RefreshListService } from "src/app/shared/services/refresh-service/refresh-list.service";
import { meses } from "src/app/dictionary/meses-do-ano.dictionary";

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

const moment = _rollupMoment || _moment;

@Component({
  selector: "app-input-date",
  templateUrl: "./input-date.component.html",
  styleUrls: ["./input-date.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class InputDateComponent implements OnInit, OnChanges {

  @Input() dataNaformata: string = "";
  mesAnoRegistro: string = "";
  date = new FormControl(moment());

  constructor(private refreshListService: RefreshListService) {}


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dataNaformata'] && changes['dataNaformata'].currentValue !== '') {
      this.date.setValue(moment(changes['dataNaformata'].currentValue));
    }
  }

  ngOnInit(): void {
    this.emitFormattedDate();
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const month = normalizedMonthAndYear.month();
    const year = normalizedMonthAndYear.year();
    this.mesAnoRegistro = `${meses[month]}/${year}`;
    this.date.setValue(normalizedMonthAndYear); // Atualizar o valor do FormControl
    this.refreshListService.emitRefreshTable(this.mesAnoRegistro);
    datepicker.close();
  }
  
  emitFormattedDate() {
    const dateValue = this.date.value;
    if (dateValue) {
      const monthIndex = dateValue.month();
      const year = dateValue.year();
      this.mesAnoRegistro = `${meses[monthIndex]}/${year}`;
      this.refreshListService.emitRefreshTable(this.mesAnoRegistro);
    }
  }
}
