import { CookieService } from "ngx-cookie-service";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as Cookies from "js-cookie";
@Injectable({
  providedIn: "root"
})
export class DisplaylayoutService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}
  private dataSub = new Subject();
  fields: any;
  resArr: any = [];
  getDataSub() {
    return this.dataSub.asObservable();
  }

  getFormData(param1: string) {
    this.http
      .get("http://localhost:3000/api/layout/getformdata/" + param1)
      .subscribe((data: any) => {
        console.log(data.docs);
        this.resArr = Object.assign([], data.docs);

        sessionStorage.setItem("formdata", JSON.stringify(data.docs));

        if (!data.ok) {
          this.toastr.error("Data not found for the given form", "Error!");
        }
        this.dataSub.next(this.resArr);
      });
  }
}
