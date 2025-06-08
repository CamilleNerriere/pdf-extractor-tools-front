import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Nav } from './components/nav/nav';

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
