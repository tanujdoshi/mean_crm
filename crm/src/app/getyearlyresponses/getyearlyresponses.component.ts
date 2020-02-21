import { OnDestroy } from "@angular/core";
import { GetyearlyresponsesService } from "./getyearlyresponses.service";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-getyearlyresponses",
  templateUrl: "./getyearlyresponses.component.html",
  styleUrls: ["./getyearlyresponses.component.css"]
})
export class GetyearlyresponsesComponent implements OnInit, OnDestroy {
  private yearlySubscriber: Subscription;
  private responsedData: any;
  private columnDefs = [];
  private rowData: any = [];
  private keys = []
  private objectKeys = Object.keys;
  private values: any = [];
  private flag = false;
  constructor(
    private _toasterService: ToastrService,
    private _getYearlyResponsesService: GetyearlyresponsesService
  ) {}
  columnDefs1 = [
    {headerName: '_id', field: '_id' },
    {headerName: 'First', field: 'First' },
    {headerName: 'Second', field: 'Second'},
    {headerName: 'Third', field: 'Third'},
    {headerName: 'by', field: 'by'},
    {headerName: 'subdate', field: 'subdate'},
    {headerName: 'formid', field: 'formid'},
    {headerName: 'year', field: 'year'},
    {headerName: 'verifystatus', field: 'verifystatus'},



];

rowData1 = [
    { _id: 'Toyota', First: 'Celica', Second: 35000, Third: 'Celica', by: 'Celica',
    subdate: 'Celica', formid: 'Celica', year: 'Celica', verifystatus: 'Celica' },
    
];
  ngOnInit() {
    // this.yearlySubscriber = this._getYearlyResponsesService
    //   .getYearlysubs()
    //   .subscribe((res: any) => {
    //     this.keys = Object.keys(res[0]);
    //     this.values = Object.values(res);
    //     // console.log(...this.keys)
    //     // console.log(...this.values)
    //     for(let i = 0; i<this.keys.length; i++) {
    //       // console.log(this.keys[i])
    //       this.columnDefs.push({headerName: this.keys[i], field: this.keys[i], sortable: true, filter: true})
    //     }
    //     console.log(...this.columnDefs)
    //     console.log(...this.columnDefs)
    //     // this.rowData.push(JSON.stringify(res))
    //     console.log(...this.rowData)
        
    //     this.responsedData = res;
    //   });
  }

  onSubmit(form: NgForm) {
    if (Number.isInteger(+form.value.year) && form.value.year.length === 4) {
      console.warn(form.value.year);
      this._getYearlyResponsesService.getYearlyResponses(
        form.value.year,
        sessionStorage.getItem("cspace")
      );
      this.yearlySubscriber = this._getYearlyResponsesService.getYearlysubs().subscribe((res:any) => {
        this.keys = Object.keys(res[0]);
        this.values = Object.values(res);
        // console.log(...this.keys)
        // console.log(...this.values)
        for(let i = 0; i<this.keys.length; i++) {
          // console.log(this.keys[i])
          this.columnDefs.push({header: this.keys[i], field: this.keys[i]})
        }
        console.log(...this.columnDefs)
        this.rowData.push(...res)
        console.log(...this.rowData)
        
        this.responsedData = res;
      })
      this.flag = true;
    } else {
      this._toasterService.error(
        "Years are supposed to entered in digits and Supposed to be 4 digits long!"
      );
      return;
    }
  }

  ngOnDestroy(): void {
    this.yearlySubscriber.unsubscribe();
  }
}
