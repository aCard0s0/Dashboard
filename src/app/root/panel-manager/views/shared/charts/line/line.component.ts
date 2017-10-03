import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { deserialize } from 'json-typescript-mapper';
import { ServiceManager }     from 'app/services/service.manager'
import { LineChartModel, LineChartDataModel, LineChartOption } from './line.model';
import { DateManager } from 'app/structures/DateManager';
import { DateConfig } from 'app/structures/date-config.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'line-chart',
  templateUrl: './line.component.html',
})
export class LineChartComponent implements OnInit, OnDestroy {

  @Input("lineChartModel") 
    set chart(value: LineChartModel) { this._bs.next(value); }
    get chart(): LineChartModel { return this._bs.getValue() };

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;
  private dateConfig: DateConfig;       // set dates acording with config file
  private dates: Array<DateManager>;    // for service call

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

  private workflow() {
    this.dateConfig = deserialize(DateConfig, this.chart.dateConfig);
    this.setDefaultValues();
    this.setDateRange();
    this.callService();
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }

  /**
   *   
   */
  private setDefaultValues() {

    let tmpData = new Array<LineChartDataModel>(2);  // Setting default data, porque so funciona com 3?
    for(let i=0; i < tmpData.length; i++) {
        tmpData[i] = new LineChartDataModel("", []);
    }
    this.chart.data = tmpData;
    this.chart.options = new LineChartOption();
  }

  private setDateRange(){

    let now = new DateManager(new Date()); // everytime that comp init, set for current date
    let xAxis: Array<string> = new Array<string>(this.dateConfig.value);

    for(let i=this.dateConfig.value-1; i >= 0; i--) {
      // format xAsis
      xAxis[i] = this.chart.xAxisModel               
                    .replace("{d}",   now.getDay().toString() )  
                    .replace("{wd}",  now.getWeekDay() )
                    .replace("{m}",   now.getNameMonth() )
                    .replace("{y}",   now.getyear().toString() );
      
      // save frist and last date for service call
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
    this.chart.xAxisLabel = xAxis;
    console.log(this.chart.xAxisLabel)
  }

  private callService() {

    let d1 = this.dates[0].format();  // oldest date
    let d2 = this.dates[1].format();  // newest date
    let responseData;
    
    this.service.callServiceInRange(this.chart.serviceUrl, d1, d2)
    //this.service.callService("http://192.168.160.107/dashboard/api/lineChart/procACN/2017-05-08/2017-05-14?callback=JSONP_CALLBACK")  
      .subscribe(
        res => {   // success
            responseData = new Array<LineChartDataModel>(res.length);
            for(let i=0; i < res.length; i++){
              responseData[i] = new LineChartDataModel(res[i].label, res[i].data);
            }
        },
        err => {  // fail
          console.log(err)
        },
        () => {   // finally on success
          this.chart.data = responseData;
        }
      );
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}