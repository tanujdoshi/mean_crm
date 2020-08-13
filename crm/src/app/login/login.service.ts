import { CspaceService } from './../cspace/cspace.service';
import { Loginmodel } from './login.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as Cookies from 'js-cookie';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private datasub: Subscription;
  private resdata;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router,
    private cspaceService: CspaceService
  ) {}

  private authStatus = new Subject<boolean>();

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  isLoggedIn() {
    if (sessionStorage.getItem('email') !== null) {
      return true;
    } else {
      return false;
    }
  }

  getReload() {
    window.location.reload();
  }
  getSpaceValue() {
    return Cookies.get('espace');
  }

  loginUser(email: string, password: string) {
    const loginModel: Loginmodel = { email, password };
    this.http
      .post('http://localhost:3000/api/user/login', loginModel)
      .subscribe(
        (res: any) => {
          if (res.ok) {
            this.authStatus.next(true);
            sessionStorage.setItem('email', email);
            this.toastr.success(
              'Redirecting to Home Page in 3 secs..',
              'Logged In !', { progressBar: true }
            );
            setTimeout(() => {
              this.router.navigate(['/']);
              this.cspaceService.checkSpace(sessionStorage.getItem('email'));
              this.datasub = this.cspaceService
                .getCheckSpaceListener()
                .subscribe((response: any) => {
                  if (
                    response.companySpace !== '***' &&
                    response.empspace !== '***'
                  ) {
                    console.log(response);
                    sessionStorage.setItem('cspace', response.companyspace);
                    sessionStorage.setItem('espace', response.empspace);
                    Cookies.set('espace', response.empspace);
                  }
                });
            }, 3000);
          }
          console.log(res);
        },
        err => {
          this.toastr.error('Username or Password are wrong', 'Login Failed', { progressBar: true });
          console.log(err);
        }
      );
  }
}
