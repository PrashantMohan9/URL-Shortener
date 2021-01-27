import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    if(form.invalid) {
      alert("Please Enter Valid Input");
      return;
    }

    this.authService.createUser(form.value.email, form.value.password, form.value.name);
    this.router.navigate(['/landing']);
  }

}
