import { LoginService } from './../login/login.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AddempsService } from './addemps.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
const flag = false;
console.log('ESPACE FROM EMPS: ', sessionStorage.getItem('espace'));
const url =
  'http://localhost:3000/api/user/uploadcsv/' +
  sessionStorage.getItem('espace');
@Component({
  selector: 'app-addemps',
  templateUrl: './addemps.component.html',
  styleUrls: ['./addemps.component.css']
})
export class AddempsComponent implements OnInit {
  constructor(
    private addempsService: AddempsService,
    private toastr: ToastrService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.attachmentList.push(JSON.parse(response));
    };
  }

  uploader: FileUploader = new FileUploader({ url });
  attachmentList: any = [];
  ngOnInit() { }
}
