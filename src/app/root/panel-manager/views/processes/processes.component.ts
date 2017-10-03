import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { deserialize } from 'json-typescript-mapper';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

import { LineChartModel } from '../shared/charts/line/line.model';
import { PieChartModel }  from '../shared/charts/pie/pie.model';

@Component({
  selector: 'processes',
  templateUrl: './processes.component.html'
})
export class ProcessesComponent implements OnInit {

  @Input("view") view;
  
    public title1: string;
    public lineChart: LineChartModel;
    public title2: string;
    public pieChart: PieChartModel;
  
    constructor() {
    }
  
    ngOnChanges(changes: SimpleChanges) {
      if (changes['view']) {
        this.title1 = this.view.title1;
        this.lineChart = deserialize(LineChartModel, this.view.lineChart);
        this.title2 = this.view.title2;
        this.pieChart = deserialize(PieChartModel, this.view.pieChart);
      }
    }
  
    ngOnInit() {
      this.title1 = this.view.title1;
      this.lineChart = deserialize(LineChartModel, this.view.lineChart);
      this.title2 = this.view.title2;
      this.pieChart = deserialize(PieChartModel, this.view.pieChart);
    }

  /* @Input("view")
    set view(value) { this._bs.next(value); }
    get view() { return this._bs.getValue() };

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;

  public lineChart: LineChartModel;
  public pieChart: PieChartModel;

  constructor() {
  }

  ngOnInit() {

    this.subscription = this._bs.subscribe( () => {

      this.lineChart = deserialize(LineChartModel, this.view.lineChart);
      this.pieChart = deserialize(PieChartModel, this.view.pieChart);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  } */
}
