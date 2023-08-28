import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent {

  constructor(
    private dialog: MatDialog
  ){

  }

  openCreateAccountDialog(){
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      width: '600px',
      minHeight: '660px',
      maxHeight:'660px',
      panelClass: 'modalStyle',
      backdropClass: 'modalStyleBackdrop',
      disableClose: true,
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      
    });
  }

}
