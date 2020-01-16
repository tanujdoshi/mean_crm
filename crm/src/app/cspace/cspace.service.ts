import { CspaceModel } from './cspace.model';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CspaceService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  createSpace(company: string, email: string) {
    const spaceModel: CspaceModel = {company, email}
    console.log('Company in service ts', company)
    this.http
      .post("http://localhost:3000/api/user/createspace", spaceModel)
      .subscribe((res: any) => {
        if (res.ok) {
          this.toastr.success("Space has been created", "Done!");
          console.log(res)
        }
      }, err => this.toastr.error('Already taken, add prefix or postfix to make it unique!', 'Try Again'));
  }
}
