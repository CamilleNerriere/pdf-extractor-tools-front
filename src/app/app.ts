import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Nav } from './nav/nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports:[RouterOutlet, Header, Footer, Nav]
})
export class App {
  protected title = 'pdf-tools-front';
  isLogged = signal(true);
  showNavBar=signal(false);
}
