import { ToastrService } from 'ngx-toastr';
import { CspaceService } from './cspace.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cspace',
  templateUrl: './cspace.component.html',
  styleUrls: ['./cspace.component.css']
})
export class CspaceComponent implements OnInit {
  private checkSpaceSub: Subscription;
  private isCheckSpace = false;
  private responsedData;
  constructor(private cspaceService: CspaceService, private toastr: ToastrService) {}

  ngOnInit() {
    this.cspaceService.checkSpace(sessionStorage.getItem('email'));
    this.checkSpaceSub = this.cspaceService.getCheckSpaceListener().subscribe( (data: any) => {
      if (data.companySpace !== '***' && data.empspace !== '***') {
        this.isCheckSpace = true;
        this.responsedData = data;
        // this.toastr.error('It seems you created the space before', 'You have created space already')
      }
    });
  }

  onCreateSpace(form: NgForm) {

    const company = form.value.company;
    const trimmednlower = company.replace(/\s/g, '').toLowerCase();
    console.log(trimmednlower);
    if (trimmednlower == null) {
      return;
    }
    console.log(sessionStorage.getItem('email'));
    this.cspaceService.createSpace(trimmednlower, sessionStorage.getItem('email'));
  }
}
