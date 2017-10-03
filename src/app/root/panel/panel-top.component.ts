import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

import { Panel } 	from './panel.model';
import { ServiceManager } from '../../services/service.manager';

@Component({
  selector: 'panel-top',
  templateUrl: './panel-top.component.html',
  styleUrls: ['./panel.css']
})
export class PanelTopComponent implements OnInit, AfterViewInit {

  @Input("panel")	panel: Panel;

  private serviceStatus: any[];   // used for server

  constructor(
    public service: ServiceManager
  ) { }

  ngOnInit() {
    this.workflow();
  }

  ngAfterViewInit() {
    setInterval( () => {
      this.workflow();
    }, this.panel.summaryIntreval);
  }

  private workflow() {
    switch(this.panel.panelId)
    {
      case 0 : this.callServiceForServers();
        break;
      case 1 : this.callServiceForDB();
        break;
      case 2 : this.callServiceForProcess();
        break;
      case 3 : this.callServiceForTest();
        break;
      case 4 : this.callServiceForWebSites();
        break;
      case 5 : this.callServiceForUsers();
        break;
      default: this.panel.panelColor = "panel panel-primary";
    }
  }
  
  /**
   *  Check the service's for the Servers
   */
  private callServiceForServers() {

    this.serviceStatus = [];
    this.panel.summary.forEach( (elem, index) => {
      this.service.callService(elem.serviceUrl)
        .subscribe(
          res => {
            this.serviceStatus[index] = res.code;
          },
          err => {
            console.log(err)
          },
          () => {
            this.panel.setServerPanel(this.serviceStatus);
          }
        );
    });
  }

  private callServiceForDB() {

    this.serviceStatus = [];
    this.panel.summary.forEach( (element, index) => {   // ready to multi service
      this.service.callService(element.serviceUrl)
        .subscribe(
          res => {
           this.serviceStatus[index] = res;
          },
          err => {
            console.log(err)
          },
          () => {
            this.panel.setDBPanel(this.serviceStatus);
          }
        )}
      );
  }
  
  private callServiceForProcess() {

    this.serviceStatus = [];
    this.panel.summary.forEach( (element, index) => {   // ready to multi service
      this.service.callService(element.serviceUrl)
        .subscribe(
          res => {
           this.serviceStatus[index] = res;
          },
          err => {
            console.log(err)
          },
          () => {
            this.panel.setProcessPanel(this.serviceStatus);
          }
        )}
      );
  }

  private callServiceForTest() {

    this.serviceStatus = [];
    this.panel.summary.forEach( (element, index) => {   // ready to multi service
      this.service.callService(element.serviceUrl)
        .subscribe(
          res => {
            this.serviceStatus[index] = res;
          },
          err => {
            console.log(err);
          },
          () => {
            this.panel.setTestsPanel(this.serviceStatus);
          }
        )
    });
  }

  /**
   *  Check the service to config WebSites Panels
   */
  private callServiceForWebSites() {
    
    this.panel.summary.forEach( (element, index) => {   // ready to multi service
      this.service.callService(element.serviceUrl)
        .subscribe(
          res => {
            // element.display   - not used
            this.panel.setSoftwarePanel(res.code);
          },
          err => {
            this.panel.setSotwarePanelError();
          }
        )
    });
  }

  private callServiceForUsers() {
    this.panel.setUserPanel();
  }

}
