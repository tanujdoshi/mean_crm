import { AddempsService } from './addemps.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

const url = 'http://localhost:3000/api/user/uploadcsv/' + sessionStorage.getItem('espace');

@Component({
  selector: 'app-addemps',
  templateUrl: './addemps.component.html',
  styleUrls: ['./addemps.component.css']
})
export class AddempsComponent implements OnInit {

  ngOnInit() {
  }

  uploader:FileUploader = new FileUploader({url: url});

  attachmentList: any = []
  constructor(private addempsService: AddempsService, private toastr: ToastrService) { 
    this.uploader.onCompleteItem = (item:any , response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response))
    }
  }

}
