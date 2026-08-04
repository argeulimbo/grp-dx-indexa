import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Separador } from '../../../shared/components/separador/separador';

import { ContatoService } from '../../../shared/services/contato';

import { DxButtonComponent, DxDateBoxComponent, DxTextAreaComponent, DxTextBoxComponent } from 'devextreme-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-contato',
  templateUrl: './adicionar-contato.component.html',
  styleUrl: './adicionar-contato.component.scss',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DxButtonComponent,
    DxDateBoxComponent,
    DxTextAreaComponent,
    DxTextBoxComponent
]
})
export class AdicionarContatoComponent implements OnInit {

  contatoForm!: FormGroup

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarContatos();
  }

  inicializarFormulario() {
    this.contatoForm = new FormGroup({
      nome:            new FormControl('', Validators.required),
      telefone:        new FormControl('', Validators.required),
      email:           new FormControl('', [Validators.required, Validators.email]),
      aniversario:     new FormControl(''),
      redes:           new FormControl(),
      observacoes:     new FormControl()
    })
  }

  carregarContatos() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contatoForm.patchValue(contato)
      })
    }
  }

  salvarContato() {
    const novoContato = this.contatoForm.value;
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      novoContato.id = parseInt(id);
    }
    else {
      delete novoContato.id;
    }

    this.contatoService.editarOuSalvarContato(novoContato).subscribe(() => {
      this.contatoForm.reset();
      this.router.navigateByUrl('/lista-contatos');
    });
  }

  cancelar() {
    this.contatoForm.reset();
  }

}
