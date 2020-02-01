import { LayoutmanagerService } from "./layoutmanager.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-layoutmanager",
  templateUrl: "./layoutmanager.component.html",
  styleUrls: ["./layoutmanager.component.css"]
})
export class LayoutmanagerComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  selectedkey: any;
  options = ["input", "textarea"];
  constructor(
    private formBuilder: FormBuilder,
    private layoutService: LayoutmanagerService
  ) {}
  responsedData: any;
  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ["", Validators.required],
      submityear: ["", Validators.required],
      tickets: new FormArray([])
    });
  }

  // convenience getters for easy access to form fields
  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.tickets as FormArray;
  }

  get op() {
    return this.op.templateOptions as FormArray;
  }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        this.t.push(
          this.formBuilder.group({
            key: ["", Validators.required],
            type: [""],
            templateOptions: this.formBuilder.group({
              label: ["", Validators.required],
              placeholder: [""],
              required: true
            })
          })
        );
      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    // alert(
    //   // "SUCCESS!! :-)\n\n" + JSON.stringify(this.dynamicForm.value, null, 4)
    //   JSON.stringify(this.dynamicForm.value.submityear)
    //   );
    // this.responsedData = JSON.stringify(this.dynamicForm.value, null, 4);
    // console.log("RES: \n", this.responsedData)
    this.layoutService.addLayout(
      this.dynamicForm.value,
      sessionStorage.getItem("cspace"),
      this.dynamicForm.value.submityear
    );
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
}
