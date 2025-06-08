import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Modal } from '../modal/modal';

@Component({
  selector: 'app-profil',
  imports: [MatDialogModule],
  templateUrl: './profil.html',
  styleUrl: './profil.scss'
})
export class Profil {
  private dialog = inject(MatDialog);
  openDialog(): void {
    const dialogRef = this.dialog.open(Modal, {
      data: {firstname: 'Julien', lastname: 'Latorre', username:'Juju' }  // exemple de data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Modale fermée avec :', result);
      } else {
        console.log('Modale annulée');
      }
    });
  }
}
