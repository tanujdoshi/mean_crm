import { Empauthmodel } from "./empauth.model";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as Cookie from "js-cookie";
@Injectable({
  providedIn: "root"
})
export class EmpauthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private empAuthStatus = new Subject<boolean>();

  getEmpAuthStatus() {
    return this.empAuthStatus.asObservable();
  }

  isEmpLoggedIn() {
    if (
      Cookie.get("empemail") !== undefined &&
      Cookie.get("empspace") !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkEmpAuth(email: string, cspace: string, password: string) {
    const model: Empauthmodel = { email, cspace, password };
    this.http
      .post("http://localhost:3000/api/employee/empauth", model)
      .subscribe((res: any) => {
        if (res.ok) {
          this.toastr.success("redirecting to home in 3 secs", "Logged In!", { progressBar: true });
          sessionStorage.setItem("empemail", email);
          sessionStorage.setItem("empspace", cspace);
          Cookie.set("empemail", email);
          Cookie.set("empspace", cspace);
          this.empAuthStatus.next(true);
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 3000);
        }
        if (!res.ok) {
          this.toastr.error(
            "Email or password is incorrect, make sure entered company space is correct",
            "Failed!", { progressBar: true }
          );
        }
      });
  }
}
