import { GetYearlyResponse } from './getyearlyresponses.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetyearlyresponsesService {
  constructor(
    private http: HttpClient,
    private toasterService: ToastrService
  ) { }
  private submissionSubject = new Subject<any>();
  private isEmpty: boolean;
  private url = 'http://localhost:3000/api/user/';

  getIsEmpty() {
    return this.isEmpty;
  }

  getYearlysubs() {
    return this.submissionSubject.asObservable();
  }

  getYearlyResponses(year: string, cspace: string) {
    console.warn(cspace);
    const model: GetYearlyResponse = { year, cspace };
    this.http
      .post(this.url + 'getyearlysubs', model)
      .subscribe((res: any) => {
        console.log('RESPONSE FROM GETYEARLYSUBS', res);
        if (res.docs.length === 0) {
          this.toasterService.info(
            'There are no submissions for the year: ' + year,
            'Found None',
            { progressBar: true }
          );
          this.isEmpty = true;
        } else {
          this.submissionSubject.next(res.docs);
        }
      });
  }
}
