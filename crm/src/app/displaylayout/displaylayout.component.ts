import { FormGroup } from '@angular/forms';
import { DisplaylayoutService } from "./displaylayout.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {FormlyFieldConfig} from '@ngx-formly/core';

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
  arr = []
  fields: FormlyFieldConfig[] = JSON.parse(sessionStorage.getItem('formdata'))


  ngOnInit() {
    this.param1 = this.route.snapshot.queryParamMap.get("id");
    console.log(this.param1);
    this.displayLayoutService.getFormData(this.param1);
    setTimeout(() => {
      this.dataSubscriber = this.displayLayoutService
        .getDataSub()
        .subscribe((data: any) => {
          this.responsedData = data;
        });

    },5000);
    console.log(this.responsedData, 'DATA')
}



}
