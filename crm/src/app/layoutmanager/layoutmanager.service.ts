import { LayoutModel } from './layout.model';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LayoutmanagerService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  addLayout(layout: string) {
    const model: LayoutModel = {layout}
    this.http.post('http://localhost:3000/api/layout/addlayout/' + sessionStorage.getItem('email'), model).subscribe((res: any) => {
      console.log(res)
    })
  }
}
