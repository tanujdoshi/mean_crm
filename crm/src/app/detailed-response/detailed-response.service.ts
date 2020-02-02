import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DetailedResponseService {
  private dataSubject = new Subject<any>();
  constructor(private http: HttpClient) {}

  getDataSubject() {
    return this.dataSubject.asObservable();
  }

  getResponse(id: string) {
    this.http
      .get(
        "http://localhost:3000/api/employee/getresponse/" +
          id +
          "/" +
          sessionStorage.getItem("empspace") +
          "/" +
          sessionStorage.getItem("empemail")
      )
      .subscribe((res: any) => {
        console.log(res.docs, "FROM DETAIED RES!");
        this.dataSubject.next(res.docs);
      });
  }
}
