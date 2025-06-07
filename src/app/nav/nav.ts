import { Component, Input, input, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',

})
export class Nav {
  @Input({ required: true }) isLogged!: Signal<boolean>;
  @Input({ required: true }) showNavBar!: Signal<boolean>;

}
