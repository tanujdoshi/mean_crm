import { getYearlyResponse } from "./getyearlyresponses.model";
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GetyearlyresponsesService {
  private submissionSubject = new Subject<any>();

  getYearlysubs() {
    return this.submissionSubject.asObservable();
  }
  private _url = "http://localhost:3000/api/user/";
  constructor(
    private _http: HttpClient,
    private _toasterService: ToastrService
  ) {}

  getYearlyResponses(year: string, cspace: string) {
    console.warn(cspace);
    const model: getYearlyResponse = { year, cspace };
    this._http
      .post(this._url + "getyearlysubs", model)
      .subscribe((res: any) => {
        console.log("RESPONSE FROM GETYEARLYSUBS", res);
        if (res.docs.length === 0) {
          this._toasterService.info(
            "There are no submissions for the year: " + year,
            "Found None"
          );
        } else {
          this.submissionSubject.next(res.docs);
        }
      });
  }
}
