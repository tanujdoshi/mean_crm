import { browserRefresh } from "./../app.component";
import { EmpauthService } from "./../empauth/empauth.service";
import { ToastrService } from "ngx-toastr";
import { LoginService } from "./../login/login.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import * as Cookie from "js-cookie";

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
  private status;
  private astatus;
  private estatus;
  private empstatus;
  public browserRefresh: boolean;

  refreshAuth() {
    this.authStatusSub = this.loginService.getAuthStatus().subscribe(data => {
      console.log("ISAUTHLOGGED: ", data);
      this.userIsAuthenticated = data;
      this.status = data;
      console.log("STATUS: ", this.status);
    });
  }

  refreshEmp() {
    this.empAuthStatusSub = this.empAuthService
      .getEmpAuthStatus()
      .subscribe(data => {
        console.log("ISEMPLOGGED", data);
        this.empUserIsAuthenticated = data;
        this.empstatus = data;
        console.log("EMPSTATUS: ", this.empstatus);
      });
  }
  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private empAuthService: EmpauthService
  ) {}
  ngOnInit() {
    this.browserRefresh = browserRefresh;
    this.refreshEmp();
    this.refreshAuth();
    this.astatus = this.loginService.isLoggedIn();
    this.estatus = this.empAuthService.isEmpLoggedIn();
  }

  onLogout() {
    this.userIsAuthenticated = false;
    this.status = false;
    this.empstatus = false;
    this.astatus = false;
    this.estatus = false;
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("cspace");
    sessionStorage.removeItem("espace");
    sessionStorage.removeItem("empemail");
    sessionStorage.removeItem("empspace");
    Cookie.remove("empemail");
    Cookie.remove("empspace");
    this.toastr.success("", "Logged Out Successfully!");
  }
}
