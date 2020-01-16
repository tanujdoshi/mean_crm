import { ToastrService } from 'ngx-toastr';
import { CspaceService } from './cspace.service';
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-cspace",
  templateUrl: "./cspace.component.html",
  styleUrls: ["./cspace.component.css"]
})
export class CspaceComponent implements OnInit {
  constructor(private cspaceService: CspaceService, private toastr: ToastrService) {}

  ngOnInit() {}

  onCreateSpace(form: NgForm) {
    
    let company = form.value.company;
    const trimmednlower = company.replace(/\s/g, "").toLowerCase();
    console.log(trimmednlower)
    if(trimmednlower == null) {
      return;
    }
    console.log(sessionStorage.getItem('email'))
    this.cspaceService.createSpace(trimmednlower, sessionStorage.getItem('email'))
  }
}
