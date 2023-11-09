import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-modal-clear-historic',
  templateUrl: './modal-clear-historic.component.html',
  styleUrls: ['./modal-clear-historic.component.scss']
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
