import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HomeService {
  constructor(private http: HttpClient) {}
  private datasub = new Subject();

  getDataSub() {
    return this.datasub.asObservable()
  }

  getForms() {
    this.http
      .get(
        "http://localhost:3000/api/employee/getcrforms/" +
          sessionStorage.getItem("empspace")
      )
      .subscribe((res: any) => {
        console.log(res.docs)
        this.datasub.next(res.docs)
      });
  }
}
