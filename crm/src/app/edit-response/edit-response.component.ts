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
  id: any;
  year: any;
  responsedData: any;
  keys: any = [];
  values: any = [];
  objectkeys = Object.keys;
  private dataSubscriber: Subscription;
  constructor(private route: ActivatedRoute, private editResponseService: EditResponseService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.year = this.route.snapshot.queryParamMap.get('year');
    this.editResponseService.getFormData(this.id, this.year, sessionStorage.getItem('empspace'));
    this.dataSubscriber = this.editResponseService.getDataObserver().subscribe((res: any) => {
      this.responsedData = res;
      this.keys = Object.keys(res);
      this.values = Object.values(res);
      console.log(res, 'A');
    });
  }
  onSubmit(form: NgForm) {
    console.log('OnSUBMIT', form.value);
    this.editResponseService.saveEditedResponse(form.value, this.id);
  }
}
