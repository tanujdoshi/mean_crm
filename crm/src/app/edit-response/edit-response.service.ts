import { ToastrService } from 'ngx-toastr';
import { DisplaylayoutService } from './../displaylayout/displaylayout.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditResponseService {
  private dataObserver = new Subject<any>();
  constructor(
    private http: HttpClient,
    private displayLayoutService: DisplaylayoutService,
    private toastrService: ToastrService
  ) { }
  uri = this.displayLayoutService.url;
  getFormData(formid: string, year: any, space: string) {
    this.http
      .get(`${this.uri}/getFormData/${formid}/${year}/${space}`)
      .subscribe((res: any) => {
        console.log('CALLED');
        this.dataObserver.next(res.docs);
      });
  }
  getDataObserver() {
    return this.dataObserver.asObservable();
  }

  saveEditedResponse(object: object, formid: string) {
    this.http
      .post(
        `${this.uri}/saveEditedResponse/${sessionStorage.getItem(
          'empspace'
        )}/${formid}`,
        { data: object }
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.ok) {
          this.toastrService.success('Updated the Response', 'Success!', {
            progressBar: true
          });
        } else {
          this.toastrService.error('Something went wrong', 'Try Again!', {
            progressBar: true
          });
        }
      });
  }
}
