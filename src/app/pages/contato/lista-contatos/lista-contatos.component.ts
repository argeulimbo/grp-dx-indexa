import { RouterLink } from "@angular/router";
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Importante para o input de busca não dar erro

import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DxButtonComponent, DxTextBoxComponent } from 'devextreme-angular';

import { Contato } from '../../../shared/components/contato/contato'; // Certifique-se que o caminho está correto

import { ContatoComponent } from '../../../shared/components/contato/contato-component';

import { ContatoService } from "../../../shared/services/contato";
import { Cabecalho } from '../../../shared/components/cabecalho/cabecalho';
import { Separador } from '../../../shared/components/separador/separador';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrl: './lista-contatos.component.scss',
  standalone: true,
  imports: [
    ContatoComponent,
    Cabecalho,
    Separador,
    DxTextBoxComponent,
    DxButtonComponent,
    RouterLink,
    FormsModule
],
})
export class ListaContatosComponent implements OnInit {
  alfabeto: string = 'abcdefghijklmnopqrstuvwxyz';
  contatos: Contato[] = [];

  filtroPorTexto: string = '';

  constructor(private contatoService: ContatoService,
              private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.contatoService.obterContatos().subscribe(listaContatos => {
      this.contatos = listaContatos;
      this.changeDetectorRef.detectChanges();
    });
  }

  private removerAcentos(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  filtrarContatosPorTexto(): Contato[] {
    if (!this.filtroPorTexto) {
      return this.contatos
    }
    return this.contatos.filter(contato => {
      return contato.nome.toLowerCase().includes(this.filtroPorTexto.toLowerCase());
    })
  }

  filtrarContatosPorLetraInicial(letra: string): Contato[] {
    return this.filtrarContatosPorTexto().filter( contato => {
      // if (!contato.nome) return false;
      return contato.nome.toLowerCase().startsWith(letra)
    })
  }
}
