import { FormGroup } from "@angular/forms";
import { DisplaylayoutService } from "./displaylayout.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormlyFieldConfig } from "@ngx-formly/core";
import * as Cookies from "js-cookie";

@Component({
  selector: "app-displaylayout",
  templateUrl: "./displaylayout.component.html",
  styleUrls: ["./displaylayout.component.css"]
})
export class DisplaylayoutComponent implements OnInit {
  param1: string;
  form = new FormGroup({});
  model = {};

  constructor(
    private route: ActivatedRoute,
    private displayLayoutService: DisplaylayoutService
  ) {}
  private dataSubscriber: Subscription;
  responsedData: any;
  arr = [];
  clonedResponse: any;
  fields: FormlyFieldConfig[] = JSON.parse(sessionStorage.getItem("formdata"));

  ngOnInit() {
    this.param1 = this.route.snapshot.queryParamMap.get("id");
    console.log(this.param1);
    this.displayLayoutService.getFormData(this.param1);
    setTimeout(() => {
      this.dataSubscriber = this.displayLayoutService
        .getDataSub()
        .subscribe((data: any) => {
          this.responsedData = data;
          this.clonedResponse = [...data];
        });
    }, 5000);
    console.log(this.clonedResponse, "DATA");
  }

  onSubmit() {
    // if (this.form.valid) {
    //   alert(JSON.stringify(this.model, null, 2));
    // }
    this.displayLayoutService.saveFormData(
      this.form.value,
      sessionStorage.getItem("empspace"),
      sessionStorage.getItem("empemail"),
      this.route.snapshot.queryParamMap.get("id")
    );
  }
}
