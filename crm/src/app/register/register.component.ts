import { RegisterService } from './register.service';
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private toastr: ToastrService, private registerService: RegisterService) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    const firstname = form.value.firstname;
    const lastname = form.value.lastname;
    const email = form.value.email;
    const password = form.value.password;
    const cpassword = form.value.cpassword;

    if(password !== cpassword) {
      this.toastr.error('Passwords must be same ', 'Check your entered credentials!', { progressBar: true })
    }

    console.log(form.value);
    this.registerService.createUser(firstname, lastname, email, form.value.worksat, form.value.designation, form.value.contact, password);

  }
}
