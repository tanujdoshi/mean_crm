import { Router } from '@angular/router';
import { HomeService } from './home.service';
import { EmpauthService } from './../empauth/empauth.service';
import { Subscription } from 'rxjs';
import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private empAuthService: EmpauthService,
    private homeService: HomeService,
    private router: Router
  ) {}
  isUserAuthenticated = false;
  isEmpUserIsAuthenticated = false;
  private authSub: Subscription;
  private empAuthSub: Subscription;
  private dataSub: Subscription;
  responsedData: any;
  status = this.loginService.isLoggedIn();
  empstatus = this.empAuthService.isEmpLoggedIn();
  ngOnInit() {
    this.authSub = this.loginService.getAuthStatus().subscribe(data => {
      this.isUserAuthenticated = data;
    });
    this.empAuthSub = this.empAuthService.getEmpAuthStatus().subscribe(data => {
      this.isEmpUserIsAuthenticated = data;
    });
    this.homeService.getForms();
    this.dataSub = this.homeService.getDataSub().subscribe((res: any) => {
      this.responsedData = res;
    });
  }
  onClickForm(id: string) {
    console.log('ID', id);
    this.router.navigate(['/displaylayout'], { queryParams: { id } });
  }
}
