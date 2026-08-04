import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DxButtonComponent } from 'devextreme-angular';


@Component({
  selector: 'app-contato',
  imports: [
    DxButtonComponent,
    RouterLink
  ],
  templateUrl: './contato-component.html',
  styleUrl: './contato-component.scss',
})
export class Contato {
  @Input() nome: string = '';
  @Input() telefone: string = '';
  @Input() id?: number;
}
