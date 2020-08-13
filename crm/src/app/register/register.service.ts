import { RegisterModel } from './reg.model';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private router: Router
  ) {}

  createUser(
    firstname: string,
    lastname: string,
    email: string,
    worksat: string,
    designation: string,
    contact: string,
    password: string
  ) {
    const regmodel: RegisterModel = {
      firstname,
      lastname,
      email,
      worksat,
      designation,
      contact,
      password
    };
    this.http.post('http://localhost:3000/api/user/signup', regmodel).subscribe(
      (res: any) => {
        if (res.ok) {
          this.toastr.success(
            ' Redirecting to login page in 3 secs!',
            ' Registered Successfully', { progressBar: true }
          );
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        }
        console.log(res);
      },
      (err: any) => {
        if (!err.ok) {
          this.toastr.error(
            'Entered data isn\'t correct as it supposed to be !',
            'Something Went wrong', { progressBar: true }
          );
        }
      }
    );
  }
}
