import { CookieService } from "ngx-cookie-service";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as Cookies from "js-cookie";

export interface DisplayLayoutModel {
  data: any;
  space: string;
  by: string;
  formid: string;
}
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
        sessionStorage.setItem("formdata", JSON.stringify(data.docs));

        if (!data.ok) {
          this.toastr.error("Data not found for the given form", "Error!");
        }
        this.dataSub.next(this.resArr);
      });
  }

  saveFormData(data: any, space: string, by: string, formid: string) {
    const formdata: DisplayLayoutModel = { data, space, by, formid };
    this.http
      .post("http://localhost:3000/api/employee/savecrform", formdata)
      .subscribe((res: any) => {
        console.log("-----------RES---------");
        console.log(res);
        console.log("------------------------");
        if (res.ok) {
          this.toastr.success("Submitted Successfully!", "Success");
        }
        if (!res.ok) {
          this.toastr.error("Something Went Wrong", "Please try again later");
        }
        if (res.status) {
          console.log("ERRRORRR");
          this.toastr.error(
            "You've already submitted your response for this form",
            "Can't be done again!"
          );
        }
      });
  }
}
