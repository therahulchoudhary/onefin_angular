import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

interface Error {
  emailError: boolean,
  passwordError: boolean
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  error: Error;
  inService: boolean;
  requestError: string;
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private ds: DataService) {
    this.createForm();
    this.error = {
      emailError: false,
      passwordError: false
    };
    this.requestError = '';
    this.inService = false;
  }

  onSubmit() {
    if (!this.loginForm.value.username) {
      this.error.emailError = true;
    }
    else {
      this.error.emailError = false;
    }
    if (!this.loginForm.value.password) {
      this.error.passwordError = true;
    }
    else {
      this.error.passwordError = false;
    }
    if (this.loginForm.valid) {
      this.inService = true;
      this.ds.login(this.loginForm.value, '/usermodule/login/').subscribe(data => {
        this.inService = false;
        this.router.navigate(['home']);
        localStorage.setItem('userData', JSON.stringify(data.data));
      }, error => {
        this.inService = false;
        this.requestError = "Invalid Username or Password";
      })
    }

  }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.router.navigate(['home']);
    }
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required]
    })
  }

}
