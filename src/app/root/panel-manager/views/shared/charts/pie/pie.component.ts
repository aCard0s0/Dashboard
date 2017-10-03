import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { deserialize } from 'json-typescript-mapper';
import { PieChartModel, PieChartDataModel }      from "./pie.model";
import { ServiceManager }     from 'app/services/service.manager'
import { DateManager } from 'app/structures/DateManager';
import { DateConfig } from 'app/structures/date-config.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie.component.html'
})
export class PieChartComponent implements OnInit, OnDestroy {

  @Input("pieChartModel")
    set chart(value: PieChartModel) { this._bs.next(value); }
    get chart(): PieChartModel { return this._bs.getValue() };

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;
  private dateConfig: DateConfig;
  private dates: Array<DateManager>;

  private timer;
  
  constructor(
    public service: ServiceManager
  ) { 
    this.dates = new Array<DateManager>(2);
  }

  ngOnInit() {
    this.subscription = this._bs.subscribe( () => {
      this.workflow();
    });
  }

  ngAfterViewInit(){
    this.timer = setInterval(
      () => {
        this.workflow();
      }, this.chart.serviceInterval
    )
  }

  public workflow() {
    this.dateConfig = deserialize(DateConfig, this.chart.dateConfig);
    this.setDefaultValues();
    this.setDateRange();  // keep date updated
    this.callService();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }

  private setDefaultValues() {
    this.chart.dataLabels = ["", ""];
    this.chart.data = [1, 1];
  }

  private setDateRange() {

    let now = new DateManager(new Date()); // everytime that comp init, set for current date

    for(let i=this.dateConfig.value-1; i >= 0 ; i--){

      if(i == this.dateConfig.value-1) {
        this.dates[1] = now.clone();    // diff reference for data, newest date
      } else if (i == 0) {
        this.dates[0] = now.clone();    // diff reference for data, oldest date
      }

      // move days, month or years
      if(this.dateConfig.type == "byDay") {
        now.setPrevDay();

      } else if (this.dateConfig.type == "byMonth") {
        now.setPrevMonth();
			  now.setLastDayOfMonth();
      
      } else if (this.dateConfig.type == "byYears") {
        // set prev year
        // set last day of the year
      }
    }
    
  }

  private callService() {

    let d1 = this.dates[0].format();  // oldest date
    let d2 = this.dates[1].format();  // newest date
    let responseData, responseLabel;

    this.service.callServiceInRange(this.chart.serviceUrl, d1, d2)
    //this.service.callService("http://localhost:65069/api/pieChart/procACN/20170220/20170313?callback=JSONP_CALLBACK")
      .subscribe(
        res => {
          responseData = new Array<number>(res.length);
          responseLabel = new Array<number>(res.length);
          for(let i=0; i < res.length; i++){
            this.chart.dataLabels[i] = res[i].label;    // has to be set here
            responseData[i] = res[i].data;
          }
        },
        err => {
          console.log(err)
        },
        () => {   // finally on success
          this.chart.data = responseData;
        }
      )
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}