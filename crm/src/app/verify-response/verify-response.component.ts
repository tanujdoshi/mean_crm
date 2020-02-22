import { NgForm } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { VerifyResponseService } from './verify-response.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jspdf from "jspdf";
import html2canvas from "html2canvas"; 
@Component({
  selector: 'app-verify-response',
  templateUrl: './verify-response.component.html',
  styleUrls: ['./verify-response.component.css']
})
export class VerifyResponseComponent implements OnInit, OnDestroy {
  private paramID:any;
  private _dataSubscriber:Subscription;
  private keys: any = [];
  private values: any = [];
  responsedData: any = [];
  objectKeys = Object.keys;

  constructor(private _activatedRoute: ActivatedRoute, private _verifyResponseService: VerifyResponseService ) { }

  ngOnInit() {
    this.paramID = this._activatedRoute.snapshot.queryParamMap.get('id');
    console.log('VERIFYID', this.paramID)
    this._verifyResponseService.getVerifiedResponse(this.paramID, sessionStorage.getItem('cspace'));
    this._dataSubscriber = this._verifyResponseService.getVerifyResponseSubject().subscribe((res: any) => {
    this.keys = Object.keys(res);
    this.values = Object.values(res);
    this.responsedData.push(res);
    })
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
  onVerifyStatus(form: NgForm) {
      console.log(form.value.selection)
      this._verifyResponseService.setVerificationResponse(form.value.selection, this.paramID, sessionStorage.getItem('cspace'))
  }

  ngOnDestroy() : void {
    this._dataSubscriber.unsubscribe();
  }

}
