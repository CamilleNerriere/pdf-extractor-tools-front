import { Component, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Nav } from './components/nav/nav';
import { JwtService } from './services/jwt.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, Header, Footer, Nav]
})
export class App {
  protected title = 'pdf-tools-front';

  isLogged!: Signal<boolean>;
  showNavBar = signal(false);

  constructor(private jwtService: JwtService) {
    this.isLogged = toSignal(this.jwtService.isLoggedIn$, { initialValue: false });
  }

}
