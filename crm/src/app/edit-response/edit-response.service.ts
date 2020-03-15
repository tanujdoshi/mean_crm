import { ToastrService } from "ngx-toastr";
import { DisplaylayoutService } from "./../displaylayout/displaylayout.service";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EditResponseService {
  private dataObserver = new Subject<any>();
  constructor(
    private _http: HttpClient,
    private _displayLayoutService: DisplaylayoutService,
    private _toastrService: ToastrService
  ) {}
  uri = this._displayLayoutService.url;
  getFormData(formid: string, year: any, space: string) {
    this._http
      .get(`${this.uri}/getFormData/${formid}/${year}/${space}`)
      .subscribe((res: any) => {
        console.log("CALLED");
        this.dataObserver.next(res.docs);
      });
  }
  getDataObserver() {
    return this.dataObserver.asObservable();
  }

  saveEditedResponse(object: Object, formid: string) {
    this._http
      .post(
        `${this.uri}/saveEditedResponse/${sessionStorage.getItem(
          "empspace"
        )}/${formid}`,
        { data: object }
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.ok) {
          this._toastrService.success("Updated the Response", "Success!", {
            progressBar: true
          });
        } else {
          this._toastrService.error("Something went wrong", "Try Again!", {
            progressBar: true
          });
        }
      });
  }
}
