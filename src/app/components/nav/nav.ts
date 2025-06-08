import { Component, inject, Input, input, Signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',

})
export class Nav {
  @Input({ required: true }) isLogged!: Signal<boolean>;
  @Input({ required: true }) showNavBar!: Signal<boolean>;

  private jwtService = inject(JwtService);
  private router = inject(Router);

  logout(){
    this.jwtService.logout();
    this.router.navigate(['']);
  }

}
