import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DetailedResponseService } from './detailed-response.service';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-detailed-response',
  templateUrl: './detailed-response.component.html',
  styleUrls: ['./detailed-response.component.css']
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
    this.idParam = this.route.snapshot.queryParamMap.get('id');
    console.log('FROM DETAILED RES :)', this.idParam);
    this.detailedResponseService.getResponse(this.idParam);
    this.dataSub = this.detailedResponseService
      .getDataSubject()
      .subscribe((res: any) => {
        this.keys = Object.keys(res);
        this.values = Object.values(res);
        console.log('KEYS: ', this.keys);
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
}
