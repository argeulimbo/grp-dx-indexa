import { RouterLink } from "@angular/router";
import { Component, OnInit } from '@angular/core';

import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxButtonComponent, DxTextBoxComponent } from 'devextreme-angular';

import { Contato } from '../../../shared/components/contato/contato-component';
import { ContatoService } from "../../../shared/services/contato";
import { Cabecalho } from '../../../shared/components/cabecalho/cabecalho';
import { Separador } from '../../../shared/components/separador/separador';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.scss',
  standalone: true,
  imports: [
    Contato,
    Cabecalho,
    Separador,
    DxTextBoxComponent,
    DxButtonComponent,
    RouterLink
],
})
export class ListaContatosComponent implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = [];

  emailValue = 'argeu@sonner.com.br';
  rules = { X: /[02-9]/ };

  filtroPorTexto: string = '';

  constructor(private contatoService: ContatoService) {

  }

  ngOnInit(): void {
    this.contatoService.obterContatos().subscribe(listaContatos => {
      this.contatos = listaContatos;
    })
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos
    }
    else {
      return this.contatos.filter(contato => {
        return contato.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase());
      })
    }
  }

  valueChanged(data: DxTextBoxTypes.ValueChangedEvent) {
    this.emailValue = `${data.value.replace(/\s/g, '').toLowerCase()}@corp.com`;
  }


  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter( contato => {
      if (!contato.nome) return false;
      return contato.nome.toLowerCase().startsWith(letra)
    })
  }
}
