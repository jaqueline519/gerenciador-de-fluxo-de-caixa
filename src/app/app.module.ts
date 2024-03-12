import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormularioRegistrosComponent } from './components/formulario-registros/formulario-registros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TotalRegistrosComponent } from './components/total-registros/total-registros.component';

const components = [
  TableComponent,
  TotalRegistrosComponent,
  FormularioRegistrosComponent
]
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ...components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
