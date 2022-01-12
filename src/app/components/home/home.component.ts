import {AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {ActivatedRoute, Router} from "@angular/router";
import {AutofillMonitor, CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {HttpService} from "../../services/http.service";
import {MatTableDataSource} from "@angular/material/table";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('10000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('10000ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  openEnterIngredients = true;
  ingredients: any;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  textAreaAutoFilled = false;

  inputTextArea = '';
  inputTextAreaArray: string[] = [];
  analysisDetails = [];

  // datatable
  displayedColumns = ['Qty', 'Unit', 'Food', 'Calories', 'Weight'];
  inputTextAreaArrayDataSource: any = new MatTableDataSource([]);
  viewTotal = false;
  totalNutrition: any;
  totalDaily: any;
  loading = false;

  constructor(public route: ActivatedRoute,
              private autofillMonitor: AutofillMonitor,
              private _ngZone: NgZone,
              private _snackBar: MatSnackBar,
              private httpService: HttpService,
              private router: Router) {
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
//Toggle Click Function
    $("#menu-toggle").click(function (e: { preventDefault: () => void; }) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  }

  ngOnDestroy() {

  }

  openTest() {
    this.router.navigate(['test'], {relativeTo: this.route});
  }

  triggerArea() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
    // console.log('triggerArea :: inputTextArea', this.inputTextArea);
  }
  changeInput() {
    // console.table(this.inputTextArea.split('\n'));
  }

  submitForm() {
    this.inputTextAreaArray = this.inputTextArea?.split('\n');
    this.inputTextAreaArray = this.inputTextAreaArray.filter(value => value);

    // get for all
    this.loading = true;
    this.httpService.getNutritionDetails(this.inputTextAreaArray).subscribe((res:any) => {
      this.loading = false;
      this.totalNutrition = res?.totalNutrients;
      this.totalDaily = res?.totalDaily;
      if(!Object.keys(this.totalDaily)?.length || !Object.keys(this.totalNutrition)) {
        this.openSnackBar('No details found , you may enter invalid input !')
        return;
      }
      this.inputTextAreaArrayDataSource.data = res?.ingredients;

      console.log('totalDaily', this.totalDaily);
      console.log('totalNutrition', this.totalNutrition);
      this.openEnterIngredients = false;
      this.viewTotal = false;

    }, error => {
      this.openSnackBar('Error Getting Empty Details')
      console.error(error);
      this.loading = false;
    });
  }

  resetForm() {
    this.inputTextArea = '';
    this.inputTextAreaArray = [];
    this.inputTextAreaArrayDataSource = new MatTableDataSource([]);
    this.viewTotal = false;
  }

  openSnackBar(message:string) {
    this._snackBar.open(message,'X',
      {
        horizontalPosition:'right',
        verticalPosition:'top',
        panelClass:'snackbarmsg',
        duration:3000,

      });
  }
}
