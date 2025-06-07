import { Component, model } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  showNavBar = model<boolean>(false);

  onClick(){
    this.showNavBar.update(oldValue => !oldValue);
  }
}
