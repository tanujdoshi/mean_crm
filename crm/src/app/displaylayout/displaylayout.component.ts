import { ToastrService } from "ngx-toastr";
import { FormGroup } from "@angular/forms";
import { DisplaylayoutService } from "./displaylayout.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormlyFieldConfig } from "@ngx-formly/core";
import * as Cookies from "js-cookie";

@Component({
  selector: "app-displaylayout",
  templateUrl: "./displaylayout.component.html",
  styleUrls: ["./displaylayout.component.css"]
})
export class DisplaylayoutComponent implements OnInit, OnDestroy {
  param1: string;
  form = new FormGroup({});
  model = {};
  year: any;
  constructor(
    private route: ActivatedRoute,
    private displayLayoutService: DisplaylayoutService,
    private toast: ToastrService
  ) {}
  private dataSubscriber: Subscription;
  private previousResSub: Subscription;
  responsedData: any;
  arr = [];
  formObj: any = {}
  clonedResponse: any;
  fields: FormlyFieldConfig[] = JSON.parse(sessionStorage.getItem("formdata"));
  ngOnInit() {
  
    console.log("FIELDS: " + JSON.stringify(this.fields));
    setTimeout(() => {
      if (!localStorage.getItem("foo")) {
        localStorage.setItem("foo", "noreload");
        location.reload();
      } else {
        localStorage.removeItem("foo");
      }
    }, 600);

    this.param1 = this.route.snapshot.queryParamMap.get("id");
    console.log(this.param1);
    this.displayLayoutService.getFormData(this.param1);
    this.dataSubscriber = this.displayLayoutService
      .getDataSub()
      .subscribe((data: any) => {
        this.responsedData = data;
        this.year = data.year;
        for (let i = 0; i < data.length; i++) {
          this.arr.push(data);
        }
      });
    console.log(this.clonedResponse, "DATA");

    // this.displayLayoutService.getEarlierResponseIfAny(
    //   sessionStorage.getItem("empemail"),
    //   sessionStorage.getItem("empspace"),
    //   sessionStorage.getItem('year')
    // );
    // this.previousResSub = this.displayLayoutService.getPreviousSub().subscribe((res:any) => {
    //   this.formObj = res
    // })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.toast.info("All fields are required", "Please try again");
      return;
    }
    this.displayLayoutService.saveFormData(
      this.form.value,
      sessionStorage.getItem("empspace"),
      sessionStorage.getItem("empemail"),
      this.route.snapshot.queryParamMap.get("id"),
      sessionStorage.getItem("year")
    );
  }
  ngOnDestroy(): void {
    sessionStorage.removeItem("formdata");
    sessionStorage.removeItem("year");
    localStorage.removeItem("foo");
  }
}
