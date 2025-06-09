import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Modal } from '../modal/modal';
import type { User } from '../../models/user';
import { JwtService } from '../../services/jwt.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './profil.html',
  styleUrl: './profil.scss'
})
export class Profil {
  private userService = inject(UserService);
  private snackBar = inject(MatSnackBar);

  // toast error if no infos 
  errorLoadingUserInfos = signal(false);

  data: WritableSignal<User | null> = signal(null);

  ngOnInit(): void {
    this.userService.getUserInfos().subscribe({
      next: response => this.data.set(response),
      error: error => {
        this.errorLoadingUserInfos.set(true);
      }
    })
  }

  // modal gestion 
  private dialog = inject(MatDialog);
  openDialog(): void {
    const user = this.data();

    if (!user) {
      this.snackBar.open('Informations utilisateurs non encore disponibles. Veuillez réessayer.', 'Fermer', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['custom-snackbar']
      });
      return;
    }

    const dialogRef = this.dialog.open(Modal, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUserInfos(result).subscribe({
          next: response => {
            this.data.update(current => {
              if (!current) return null;

              return {
                ...current,
                firstname: response.firstname,
                lastname: response.lastname,
                username: response.username
              };
            });
          },
          error: error => {
            this.snackBar.open('Erreur lors de la mise à jour des informations', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            });
          }
        });
      }
    });
  }
}
