import { AddEmpModel } from './addemps.model';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AddempsService {
  constructor(private toastr: ToastrService, private http: HttpClient) {}


}
