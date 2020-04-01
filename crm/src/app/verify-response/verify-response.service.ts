import { ToastrService } from 'ngx-toastr';
import { VerifyResponseModel } from './verify-response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifyResponseService {
  private uri = 'http://localhost:3000/';
  private verifyResponseSubject = new Subject<any>();

  getVerifyResponseSubject() {
    return this.verifyResponseSubject.asObservable();
  }
  constructor(
    private http: HttpClient,
    private toastrService: ToastrService
  ) { }

  getVerifiedResponse(id: string, cspace: string) {
    const model: VerifyResponseModel = { id, cspace };
    this.http
      .post(this.uri + 'api/user/getVerificationData', model)
      .subscribe((res: any) => {
        console.log(res.docs);
        this.verifyResponseSubject.next(res.docs);
      });
  }

  setVerificationResponse(responseValue: string, id: string, cspace: string, comment: string) {
    this.http
      .post(this.uri + 'api/user/setVerification', {
        responseValue,
        id,
        cspace,
        comment
      })
      .subscribe((res: any) => {
        // console.log(res);
        if (res.ok) {
          this.toastrService.success(
            'Changes Appplied',
            'Verification status applied !',
            { progressBar: true }
          );
        }
      });
  }
}
