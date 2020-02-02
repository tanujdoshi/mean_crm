import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ShowResponseService {
  private dataSub = new Subject<any>();

  getDataSub() {
    return this.dataSub.asObservable();
  }

  constructor(private http: HttpClient) {}

  getFormResponse() {}

  getResponses(user: string, space: string) {
    this.http
      .get(
        "http://localhost:3000/api/employee/getresponses/" + user + "/" + space
      )
      .subscribe((res: any) => {
        console.log("---------FORMRES---------");
        console.log(res.docs);
        this.dataSub.next(res.docs);
        console.log("-------- FORMRESEND------");
      });
  }
}
