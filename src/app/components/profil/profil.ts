import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Modal } from '../modal/modal';
import type { User } from '../../models/user';
import { JwtService } from '../../services/jwt.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profil',
  imports: [MatDialogModule],
  templateUrl: './profil.html',
  styleUrl: './profil.scss'
})
export class Profil {
  private userService = inject(UserService);

  data: WritableSignal<User | null> = signal(null);

  ngOnInit(): void {
    this.userService.getUserInfos().subscribe({
      next: response => this.data.set(response),
      error: error => console.log(error)
    })
  }

  // modal gestion 
  private dialog = inject(MatDialog);
  openDialog(): void {
    const user = this.data();

    if (!user) {
      console.warn("User Data not available");
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
          error: error => console.log(error)
        });
      }
    });
  }
}
