import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-modal-clear-historic',
  templateUrl: './modal-clear-historic.component.html',
  styleUrls: ['./modal-clear-historic.component.scss'],
  animations: [
    trigger('fastFadeInOutAnimation', [
      transition(':enter', [
        animate('200ms', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 }),
        ]))
      ])
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('{{time}} cubic-bezier(0,.87,.61,.98)', style({ transform: 'scale(1)' })),
      ], { params: { time: '400ms' } }),
    ]),
  ]
})
export class ModalClearHistoricComponent {

  loaded = true;

  constructor(
    private accountsService: AccountsService,
    private dialogRef: MatDialogRef<ModalClearHistoricComponent>
  ) { }

  clearHistoric() {
    this.loaded = false;

    this.accountsService.clearHistoric().subscribe({
      complete: () => {
        this.loaded = true;
        this.dialogRef.close(true);
      },
      error: () => {
        this.loaded = true;
      }
    })
  }
  @ViewChild('modalRef') modalRef: ElementRef;
  @HostListener('click', ['$event'])
  onClickModal(event: Event) {
    // Impede a propagação do evento de clique para evitar que o painel seja fechado
    event.stopPropagation();
  }
}
