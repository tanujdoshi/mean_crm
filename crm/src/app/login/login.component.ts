import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService, private loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    this.loginService.loginUser(form.value.email, form.value.password);
  }
}
