import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-connect',
  imports: [ReactiveFormsModule],
  templateUrl: './connect.html',
  styleUrl: './connect.scss'
})
export class Connect {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  hiddenPwd = true;

  onSubmit() {
    console.log(this.form.value);
  }
  
}
