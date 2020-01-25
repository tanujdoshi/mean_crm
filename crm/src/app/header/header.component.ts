import { EmpauthService } from "./../empauth/empauth.service";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./../login/login.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  empUserIsAuthenticated = false;
  private empAuthStatusSub: Subscription;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private empAuthService: EmpauthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.loginService.getAuthStatus().subscribe(data => {
      this.userIsAuthenticated = data;
    });
    this.empAuthStatusSub = this.empAuthService
      .getEmpAuthStatus()
      .subscribe(data => {
        this.empUserIsAuthenticated = data;
      });
  }
  empstatus = this.empAuthService.isEmpLoggedIn();
  status = this.loginService.isLoggedIn();

  onLogout() {
    this.userIsAuthenticated = false;
    this.status = false;
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("cspace");
    sessionStorage.removeItem("espace");
    sessionStorage.removeItem("empemail");
    sessionStorage.removeItem("empspace");
    this.toastr.success("", "Logged Out Successfully!");
  }
}
