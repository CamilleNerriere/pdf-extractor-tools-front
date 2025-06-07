import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-connect',
  imports: [ReactiveFormsModule],
  templateUrl: './connect.html',
  styleUrl: './connect.scss'
})
export class Connect {
   email = new FormControl('');
   password = new FormControl('');
}
