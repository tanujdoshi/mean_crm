import { ToastrService } from "ngx-toastr";
import { VerifyResponseModel } from "./verify-response.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VerifyResponseService {
  private _uri = "http://localhost:3000/";
  private _verifyResponseSubject = new Subject<any>();

  getVerifyResponseSubject() {
    return this._verifyResponseSubject.asObservable();
  }
  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) {}

  getVerifiedResponse(id: string, cspace: string) {
    const model: VerifyResponseModel = { id, cspace };
    this._http
      .post(this._uri + "api/user/getVerificationData", model)
      .subscribe((res: any) => {
        console.log(res.docs);
        this._verifyResponseSubject.next(res.docs);
      });
  }

  setVerificationResponse(responseValue: string, id: string, cspace: string) {
    this._http
      .post(this._uri + "api/user/setVerification", {
        responseValue,
        id,
        cspace
      })
      .subscribe((res: any) => {
        // console.log(res);
        if (res.ok) {
          this._toastrService.success(
            "Changes Appplied",
            "Verification Done!",
            { progressBar: true }
          );
        }
      });
  }
}
