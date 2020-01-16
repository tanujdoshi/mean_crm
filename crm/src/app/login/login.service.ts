import { Loginmodel } from "./login.model";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  private authStatus = new Subject<boolean>();

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  isLoggedIn() {
    return sessionStorage.getItem('email') !== null
  }

  loginUser(email: string, password: string) {
    const loginModel: Loginmodel = { email, password };
    this.http
      .post("http://localhost:3000/api/user/login", loginModel)
      .subscribe(
        (res: any) => {
          if (res.ok) {
            this.authStatus.next(true);
            sessionStorage.setItem('email', email)
            this.toastr.success(
              "Redirecting to Home Page in 3 secs..",
              "Logged In !"
            );
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 3000);
          }
          console.log(res);
        },
        err => {
          this.toastr.error("Username or Password are wrong", "Login Failed");
          console.log(err);
        }
      );
  }
}
