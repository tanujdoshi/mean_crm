import { Router } from '@angular/router';
import { ShowResponseService } from './show-response.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-show-responses',
  templateUrl: './show-responses.component.html',
  styleUrls: ['./show-responses.component.css']
})
export class ShowResponsesComponent implements OnInit, OnDestroy {
  private dataSubscriber: Subscription;
  responsedData: any;
  private temp = [];
  constructor(
    private showResponseService: ShowResponseService,
    private route: Router
  ) {}

  ngOnInit() {
    this.showResponseService.getResponses(
      sessionStorage.getItem('empemail'),
      sessionStorage.getItem('empspace')
    );
    this.dataSubscriber = this.showResponseService
      .getDataSub()
      .subscribe((data: any) => {
        this.responsedData = data;
        console.log(data);

        console.log(this.responsedData, 'RES');
      });
  }

  getId(id: string) {
    console.log('GETTAFORMID', id);
    this.route.navigate(['/showresponses-home/showfullresponse'], {
      queryParams: { id }
    });
  }

  onClick(id: string, year: any) {
    console.log('GETEDITID', id);
    this.route.navigate(['/edit-response'], { queryParams: { id, year } });
  }

  ngOnDestroy(): void {
    this.dataSubscriber.unsubscribe();
  }
}
