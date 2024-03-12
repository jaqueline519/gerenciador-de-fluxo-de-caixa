import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registro } from 'src/app/models/registros.model';
import { Form } from 'src/app/types/form.type';
import { RegistrosFinanceirosService } from '../../services/registros-financeiros.service';
import { v4 as uuidv4 } from 'uuid';
import { MesesDoAno } from 'src/app/types/meses-do-ano.type';
import { meses } from 'src/app/dictionary/meses-do-ano.dictionary';


@Component({
  selector: 'app-formulario-registros',
  templateUrl: './formulario-registros.component.html',
  styleUrls: ['./formulario-registros.component.scss']
})
export class FormularioRegistrosComponent implements OnInit, OnChanges {

  registroForm: FormGroup = new FormGroup({});
  @Input() registro: Registro = {id: ''};
  @Input() typeSubmit: Form = 'salvar';
  @Output() submitFormEvent = new EventEmitter<MesesDoAno>();
  constructor(private formBuilder: FormBuilder, private registrosFinanceirosService: RegistrosFinanceirosService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['registro']) {
    this.patchValueForm(this.registro);
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.patchValueForm(this.registro);
  }

  createForm() {
    this.registroForm = this.formBuilder.group({
      id: [''],
      descricao: ['', Validators.required],
      tipoDeRegistro: ['entrada', Validators.required],
      valor: [0, Validators.required],
      data: ['', Validators.required]
    })
  }

  patchValueForm(registro: Registro) {
    this.registroForm?.patchValue({
      id: this.typeSubmit === 'atualizar' ? registro?.id : uuidv4(),
      descricao: registro?.descricao,
      tipoDeRegistro: registro?.tipoDeRegistro,
      valor: registro?.valor,
      data: registro?.data,
    })
  }


  extrairNomeMes(data: string) {
    const dataObj = new Date(data);
    const mesIndex = dataObj.getMonth();
    return meses[mesIndex];
  }

  

  submitForm() {
    if (this.typeSubmit === 'salvar') {
      this.salvar();
    } else {
      this.atualizar();
    }

    this.submitFormEvent.emit(this.extrairNomeMes(this.registroForm.get('data')?.value));
  }

  salvar() {

    this.registrosFinanceirosService.adicionarRegistro(this.retornaRegistroParaSalvar()).subscribe({
      next: () => {
      this.registroForm.reset();
      },
      error: (error) => {
        // TODO: implementar toast de erro
      }
    })
  }

  retornaRegistroParaSalvar() {
    return {
      id: this.registroForm.get('id')?.value || uuidv4(),
      descricao: this.registroForm.get('descricao')?.value,
      tipoDeRegistro: this.registroForm.get('tipoDeRegistro')?.value,
      valor: this.registroForm.get('valor')?.value,
      data: this.registroForm.get('data')?.value,
      mes: this.extrairNomeMes(this.registroForm.get('data')?.value)
    }
  }
  atualizar() {
    this.registrosFinanceirosService.atualizarRegistro(this.retornaRegistroParaSalvar()).subscribe({
      next: (response) => {
      this.registroForm.reset();
        
      },
      error: (error) => {
        // TODO: implementar toast de erro
      }
    })
  }
}
