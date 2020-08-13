import { NgForm } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { VerifyResponseService } from './verify-response.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-verify-response',
  templateUrl: './verify-response.component.html',
  styleUrls: ['./verify-response.component.css']
})
export class VerifyResponseComponent implements OnInit, OnDestroy {
  private paramID: any;
  private dataSubscriber: Subscription;
  private keys: any = [];
  private values: any = [];
  responsedData: any = [];
  objectKeys = Object.keys;

  constructor(
    private activatedRoute: ActivatedRoute,
    private verifyResponseService: VerifyResponseService
  ) { }

  ngOnInit() {
    this.paramID = this.activatedRoute.snapshot.queryParamMap.get('id');
    console.log('VERIFYID', this.paramID);
    this.verifyResponseService.getVerifiedResponse(
      this.paramID,
      sessionStorage.getItem('cspace')
    );
    this.dataSubscriber = this.verifyResponseService
      .getVerifyResponseSubject()
      .subscribe((res: any) => {
        this.keys = Object.keys(res);
        this.values = Object.values(res);
        this.responsedData.push(res);
      });
  }
  convertPDF() {
    const data = document.getElementById('resume');
    html2canvas(data).then(canvas => {
      const imgWidth = 450;
      const pageHeight = 100;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png', 100);
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('crform.pdf');
    });
  }
  onVerifyStatus(form: NgForm) {
    console.log(form.value.selection);
    console.log(form.value.comment);
    this.verifyResponseService.setVerificationResponse(
      form.value.selection,
      this.paramID,
      sessionStorage.getItem('cspace'),
      form.value.comment
    );
  }

  ngOnDestroy(): void {
    this.dataSubscriber.unsubscribe();
  }
}
