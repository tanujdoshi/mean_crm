import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { DetailedResponseService } from "./detailed-response.service";
import { Component, OnInit } from "@angular/core";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
@Component({
  selector: "app-detailed-response",
  templateUrl: "./detailed-response.component.html",
  styleUrls: ["./detailed-response.component.css"]
})
export class DetailedResponseComponent implements OnInit {
  idParam: string;
  private keys: any = [];
  private values: any = [];
  responsedData: any = [];
  objectKeys = Object.keys;
  private dataSub: Subscription;
  constructor(
    private detailedResponseService: DetailedResponseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idParam = this.route.snapshot.queryParamMap.get("id");
    console.log('FROM DETAILED RES :)', this.idParam)
    this.detailedResponseService.getResponse(this.idParam);
    this.dataSub = this.detailedResponseService
      .getDataSubject() 
      .subscribe((res: any) => {
        this.keys = Object.keys(res);
        this.values = Object.values(res);
        console.log("KEYS: ", this.keys);
        this.responsedData.push(res);
      });
  }
  convertPDF() {
    var data = document.getElementById("resume");
    html2canvas(data).then(canvas => {
      var imgWidth = 450;
      var pageHeight = 100;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight; 

      const contentDataURL = canvas.toDataURL("image/png", 100);
      let pdf = new jspdf("p", "mm", "a4");
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("crform.pdf");
    });
  }
}
