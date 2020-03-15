import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EditResponseService } from './edit-response.service';
import { DisplaylayoutService } from './../displaylayout/displaylayout.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-response',
  templateUrl: './edit-response.component.html',
  styleUrls: ['./edit-response.component.css']
})
export class EditResponseComponent implements OnInit {
   _id: any
   _year: any
   responsedData: any
   keys:any = []
   values: any = []
   objectkeys = Object.keys
   private _dataSubscriber: Subscription
  constructor(private _route: ActivatedRoute, private _editResponseService: EditResponseService, private _router: Router) { 
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    }
  }

  ngOnInit() {
    this._id = this._route.snapshot.queryParamMap.get('id')
    this._year = this._route.snapshot.queryParamMap.get('year')
    this._editResponseService.getFormData(this._id, this._year, sessionStorage.getItem('empspace'))
    this._dataSubscriber = this._editResponseService.getDataObserver().subscribe((res:any) => {
      this.responsedData = res
      this.keys = Object.keys(res)
      this.values = Object.values(res)
      console.log(res, 'A')
    })
  }
  onSubmit(form: NgForm) {
    console.log('OnSUBMIT', form.value)
    this._editResponseService.saveEditedResponse(form.value, this._id)
  }

}
