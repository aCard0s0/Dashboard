import { Component, OnInit, Input, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceManager } from 'app/services/service.manager';
import { GeneralServerInfo } from "./server.model";
import { GaugeModel } from "../shared/charts/gauge/gauge.model";  // está num mau sitio
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'server',
  templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input("view") 
      set view(value) { this._bs.next(value); }
      get view() { return this._bs.getValue() };

  private _bs = new BehaviorSubject<any>([]);
  private subscription: Subscription;

  public errFlag;     // set erro display if server is inaccessible
  public genInfo;     // response from serverGeneral config to display IP and Uptime
  public gauges: any[];

  constructor(
    public service: ServiceManager
  ) {
  }

  ngOnInit() {

    this.subscription = this._bs.subscribe( () => {
      this.errFlag = false;         // reset
      this.callServiceForState();
    });
  }

  ngAfterViewInit() {
    // para aqui vem os timers
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private callServiceForState() {

    this.service.callService(this.view.serverStatus.serviceURL)
      .subscribe(
        res => {
          if(!res.summary.includes("Erro")){
            this.callServiceForGeneralInfo();
            this.callServiceForGauge();
          } else {
            this.errFlag = true;
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  private callServiceForGeneralInfo() {

    this.service.callService(this.view.serverGeneral.serviceURL)
      .subscribe(
          res => {
              this.genInfo = new GeneralServerInfo(res);
          },
          err => {
              console.log(err);
          }
      );
  }

  private callServiceForGauge() {

    this.service.callService(this.view.gaugeCharts.serviceURL)
      .subscribe(
        res => {
          this.gauges = [];
          for(let i=0; i < res.gaugeView.length; i++) {
            // As configs do ficheiro prevalecem
            this.gauges[i] = new GaugeModel(res.gaugeView[i], this.view.gaugeCharts.charts[i]);
          }
        },
        err => {
          console.log(err);
        }
    );
  }
}