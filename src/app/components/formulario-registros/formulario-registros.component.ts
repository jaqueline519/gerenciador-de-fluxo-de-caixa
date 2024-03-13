import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/shared/types/form.type';
import { RegistrosFinanceirosService } from '../../shared/services/registros-financeiros-service/registros-financeiros.service';
import { v4 as uuidv4 } from 'uuid';
import { MesesDoAno } from 'src/app/shared/types/meses-do-ano.type';
import { Registro } from 'src/app/shared/models/registros.model';
import { meses } from 'src/app/dictionary/meses-do-ano.dictionary';
import { SnackbarService } from 'src/app/shared/services/snackbar-service/snackbar.service';


@Component({
  selector: 'app-formulario-registros',
  templateUrl: './formulario-registros.component.html',
  styleUrls: ['./formulario-registros.component.scss']
})
export class FormularioRegistrosComponent implements OnInit, OnChanges {

  registroForm: FormGroup = new FormGroup({});
  @Input() registro: Registro = {id: ''};
  @Input() typeSubmit: Form = 'salvar';
  @Output() submitEventDateFormmatter = new EventEmitter<string>();
  @Output() submitEventDateNoFormmatter = new EventEmitter<string>();
  @Output() closeForm = new EventEmitter<boolean>();
  constructor(
    private formBuilder: FormBuilder, 
    private registrosFinanceirosService: RegistrosFinanceirosService,
    private snackbar: SnackbarService
    ) { }


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

  extrairMesAno(data: string): string {
    const dataObj = new Date(data);
    const mesIndex = dataObj.getMonth();
    const ano: number = dataObj.getFullYear();
    const nomeMes: MesesDoAno = meses[mesIndex];
    return `${nomeMes}/${ano}`;
}
  

  submitForm() {
    if (this.typeSubmit === 'salvar') {
      this.salvar();
    } else {
      this.atualizar();
    }
    this.submitEventDateNoFormmatter.emit(this.registroForm.get('data')?.value);
    this.submitEventDateFormmatter.emit(this.extrairMesAno(this.registroForm.get('data')?.value));
  }

  salvar() {
    this.registrosFinanceirosService.adicionarRegistro(this.retornaRegistroParaSalvar()).subscribe({
      next: () => {
        this.snackbar.abrirSnackBar('Registro criado com sucesso');
      this.registroForm.reset();
      },
      error: (error) => {
        this.snackbar.abrirSnackBar('Erro ao criar o registro');
      }
    })
  }

  retornaRegistroParaSalvar(): Registro {
    return {
      id: this.registroForm.get('id')?.value || uuidv4(),
      descricao: this.registroForm.get('descricao')?.value,
      tipoDeRegistro: this.registroForm.get('tipoDeRegistro')?.value,
      valor: this.registroForm.get('valor')?.value,
      data: this.registroForm.get('data')?.value,
      mesAno: this.extrairMesAno(this.registroForm.get('data')?.value)
    }
  }
  atualizar() {
    this.registrosFinanceirosService.atualizarRegistro(this.retornaRegistroParaSalvar()).subscribe({
      next: (response) => {
      this.registroForm.reset();
      this.snackbar.abrirSnackBar('Registro atualizado com sucesso');
      },
      error: (error) => {
        this.snackbar.abrirSnackBar('Erro ao criar o registro');
      }
    })
  }

  async emitCloseForm() {
    await this.registroForm.reset();
    this.registro = {id: ''};
    this.closeForm.emit(true);
  }
  
}
