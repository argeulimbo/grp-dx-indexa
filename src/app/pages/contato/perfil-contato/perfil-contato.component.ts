import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { DxButtonComponent } from 'devextreme-angular';

import { ContatoService } from '../../../shared/services/contato';
import { Contato } from '../../../shared/components/contato/contato';
import { Cabecalho } from '../../../shared/components/cabecalho/cabecalho';

@Component({
  selector: 'app-perfil-contato',
  imports: [
    DxButtonComponent,
    RouterLink],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.scss',
})
export class PerfilContatoComponent implements OnInit {

  contato: Contato = {
    id: 0,
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit()  {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.contatoService.buscarPorId(parseInt(id)).subscribe((contato) => {
        this.contato = contato;
        this.changeDetectorRef.detectChanges();
      })
    }
  }

  excluir() {
    if (this.contato.id) {
      this.contatoService.excluirContato(this.contato.id).subscribe(() => {
        this.router.navigateByUrl('/lista-contatos');
      })
    }
  }




}
