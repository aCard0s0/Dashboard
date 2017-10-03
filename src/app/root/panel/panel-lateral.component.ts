import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Panel } 	from './panel.model';
import { ServiceManager } from '../../services/service.manager';

@Component({
  selector: 'panel-lateral',
  templateUrl: './panel-lateral.component.html',
  styleUrls: ['./panel.css']
})
export class PanelLateralComponent implements OnInit, AfterViewInit {

  @Input("panel")	panel: Panel;

  /**
   *  This structure save the service response to calculate
   * the panel color.
   *  If error saves -1 else the % value of CPU, RAM or Drive
   *  The panel color is calculate by threshold.
   */
  private serviceStatus: any[];

  constructor(
    public service: ServiceManager
  ) {
  }

  ngOnInit() {
    this.callService();
  }

  ngAfterViewInit() {
    setInterval( () => {
        this.callService();
    }, this.panel.summaryIntreval);
  }

  /**
   *  Check the service
   */
  private callService() {

    this.serviceStatus = [];
   
    this.panel.summary.forEach( (elem, index) => {
      this.service.callService(elem.serviceUrl)
        .subscribe(
          res => {
            this.serviceStatus[index] = res.summary;
          },
          err => {
          },
          () => {
            this.panel.setHardwarePanel(this.serviceStatus)
          }
        )}
      );
  }
}