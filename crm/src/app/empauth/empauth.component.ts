import { EmpauthService } from './empauth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empauth',
  templateUrl: './empauth.component.html',
  styleUrls: ['./empauth.component.css']
})
export class EmpauthComponent implements OnInit {

  constructor(private empauthService: EmpauthService) { }

  ngOnInit() {
  }
  onLogin(form: NgForm) {
    console.log(form.value)
    this.empauthService.checkEmpAuth(form.value.email, form.value.cspace, form.value.password)
  }

}
